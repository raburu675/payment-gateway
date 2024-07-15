// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors');
app.use(express.static('public'));

// Load environment variables from .env file
dotenv.config();

// Enable CORS for all origins (you can specify specific origins if needed)
app.use(cors());

// Your other middleware and routes here
app.use(express.json());


// Define your constants using the environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(stripeSecretKey);//imports stripe library and initializes it with your test secret API key
// const stripe = require('stripe')("");//imports stripe library and initializes it with your test secret API key
const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;   

  try {
    //This method creates a product object in stripe. A product in striperepresents the item you're selling
    const product = await stripe.products.create({
      name: 'Dynamic Amount Product',
    });

    //This method creates a price object in Stripe. A price object is associated with a product and defines the cost of that product.
    const price = await stripe.prices.create({
      unit_amount: amount * 100, // amount in cents, pass it afrom the frontend as the request
      currency: 'usd',
      product: product.id,
    });

    //creates a new checkout session
    const session = await stripe.checkout.sessions.create({
      //An array of items being purchased, each with a price (price ID) and quantity.
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',//The mode of the checkout session, such as 'payment' for one-time payments.
      success_url: `${YOUR_DOMAIN}?success=true`,//The URL to redirect to after a successful payment.
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,//The URL to redirect to if the payment is canceled.
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Running on port 4242'));