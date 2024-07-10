const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv')
const cors = require('cors');
const bodyParser = require('body-parser');
const { Timestamp } = require('mongodb');

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


//N/B: First generate access using a function and call the function when the route 'getAccessToken' is accessed
// Function to get access token

const getAccessToken = async () => {
    const consumer_key = process.env.CONSUMER_KEY;
    const consumer_secret = process.env.CONSUMER_SECRET;
    const url = process.env.GENERATE_TOKEN_URL;
    const auth = "Basic " + Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: auth
            }
        });
        const accessToken = response.data.access_token;
        return accessToken;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Status code:", error.response.status);
        console.error("Error data:", error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
    } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request setup error:", error.message);
    }
    throw error;
    }
}

//use an express Route to check if the accessToken has been received
app.get('/getAccessToken', async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        res.send("Your access token is: " + accessToken);
    } catch (error) {
        console.error("Error fetching access token:", error.message);
        res.status(500).send("Error fetching access token");
    }
});


//route to send data to the sandbox api that send the stk push to the clients phone
app.post('/stkPush' ,async (req,res) => {    
    //extract data from the request body
    const { amount, phoneNumber, name } = req.body
    //declare the variable names for the data to be sent as the request to the sandbox api
    const shortCode = process.env.SHORT_CODE;
    const passkey = process.env.PASSKEY;
    const date = new Date();
    const timestamp =
        date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);
    
    const password = Buffer.from(shortCode + passkey + timestamp).toString('base64');
    const data = {
        BusinessShortCode: 174379,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        // Amount: 1,
        Amount: amount,
        Name: name,
        PartyA: phoneNumber,
        PartyB: 174379,
        PhoneNumber: "254" + phoneNumber.slice(1),
        CallBackURL: "https://mydomain.com/b2b/result/",
        AccountReference: "Mpesa Test",
        TransactionDesc: "Testing stk push"
    }

    try {        
        // Proceed with sending data to the sandbox API
        const accessToken = await getAccessToken();
        
        // Example: await axios.post(sandboxApiUrl, data);
        await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        })
        //pass the res that trigers the oading in the frontend
        
        // Handle the response appropriately
        console.log("Response from sandbox API:", res.data);
        res.status(200).send("STK push sent successfully");
    } catch (error) {
        console.error("Error sending STK push:", error);
        // Handle error appropriately
        res.status(500).send("Error sending STK push");
    }
})


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});