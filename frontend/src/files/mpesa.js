import React,{useState} from 'react'
import ReactDOM from 'react-dom';

function Mpesa({handleMpesa}) {
  return ReactDOM.createPortal(
    <>    
    <div  className='fixed  flex justify-center items-center top-0 left-0 h-[100vh] bottom-0 right-0 bg-black bg-opacity-70 z-50' >
        <div className='border bg-white w-1/3 text-center'>
            <div className='flex w-full justify-center'>
            <h2 className='my-12'>M-PESA BILLING INFO</h2>
            <img
            onClick={handleMpesa}
            src=''
            alt='close'
            />
            </div>
            <div className='flex flex-col items-center'>
                <input placeholder='Name' className='border-b border-gray-400 w-2/3 pb-2 outline-none'/>
                <input placeholder='Email' className='border-b border-gray-400 w-2/3 py-2 outline-none'/>
                <input placeholder='Address' className='border-b border-gray-400 w-2/3 py-2 outline-none'/>
                <input placeholder='Amount' className='border-b border-gray-400 w-2/3 py-2 outline-none'/>
                <textarea
                placeholder='instructions'
                className='border border-gray-400 w-2/3 py-2 my-6 outline-none rounded-sm'
                />
            </div>
            <button
            type='submit'
            className='bg-red-500 px-6 rounded-sm text-white py-1 my-4'
            >checkout            
            </button>
        </div>    
    </div>
    </>
    ,document.getElementById('mpesa')
  )
}

export default Mpesa;