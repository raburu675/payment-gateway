import React from 'react';
import axios from 'axios'
import {useState,useEffect} from 'react'
import ReactDOM from 'react-dom';

function Visa({handleVisa}) {

  // const Message = ({ message }) => (
  //   <section>
  //     <p>{message}</p>
  //   </section>
  // );
  const [amount, setAmount] = useState(20.00); // Initialize state with the product price

  const initiatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4242/create-checkout-session', { amount });           
      window.location.href = response.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.log(error);   
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  return ReactDOM.createPortal(    
    <>
    <div  className='fixed flex justify-center items-center top-0 left-0 h-[100vh] bottom-0 right-0 bg-black bg-opacity-70 z-50 '>
        <div className=" text-white w-full flex flex-col items-center">
          <button onClick={handleVisa}>close</button>
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
          </div>

          <form  className='w-full flex justify-center'>
          <button 
          type="submit" 
          className='bg-red-600 border rounded-md px-6 text-xs py-2 my-2'
          onClick={initiatePayment}
          >
            Checkout
          </button>
        </form>
        </div>
        

        {/* message ? (
        <Message message={message} />
        ) : (
          <ProductDisplay />
        ); */}
        
    </div>
    </>   
    ,document.getElementById('visa') 
  )
}
export default Visa;

