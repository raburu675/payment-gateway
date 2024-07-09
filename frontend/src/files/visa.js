import React from 'react'
import ReactDOM from 'react-dom';

function Visa({handleVisa}) {
  return ReactDOM.createPortal(
    <>
    <div  className='fixed flex justify-center items-center top-0 left-0 h-[100vh] bottom-0 right-0 bg-black bg-opacity-70 z-50 '>
        <div className='border shadow-2xl w-1/3 bg-white text-center'>
        <div className='flex justify-center w-full'>
            <h2>STRIPE BILLING INFO</h2>
            <img
            src=''
            alt='close'  
            onClick={handleVisa}      
            />
        </div>
        <form className='flex flex-col w-full items-center'>
            <input placeholder='Amount' className='border-b border-gray-400 w-2/3 py-2 outline-none'/>
            {/* once a user clicks the button, it sends the request to the stripe.js server taht triggers the 'checkout route' 
            // once the the router is triggersd it calls a method "stripe.checkout.sessions.create({})"

            //this function once called and is succesfull the user should be directed to a url that is checkout payment form     ??????
            */}
            <button 
            type="submit"
            className='bg-red-500 text-white w-1/4 rounded-sm my-4'
            >
            Checkout
            </button>
        </form>
        </div>
    </div>
    </>   
    ,document.getElementById('visa') 
  )
}

export default Visa
