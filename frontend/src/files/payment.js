import React,{useState} from 'react'
import Mpesa from './mpesa'
import Visa from './visa'

function Payment() {
    const [mpesa, setMpesa] = useState(false)

    //fucntion to popup the mpesa billing form
    const handleMpesa = () => {
        setMpesa(!mpesa)
    }

    const [visa, setVisa] = useState(false)

    //function to popup the visa billing form
    const handleVisa = () => {
        setVisa(!visa)
    }
  return (
    <>
    
    <div className='relative h-[100vh] w-full flex items-center justify-center'>
    <div className='border border-black w-2/3 h-2/3 flex flex-col py-12  items-center justify-center'>
        {mpesa && (
            <Mpesa
            handleMpesa={handleMpesa}            
            />
        )}

        {visa && (
            <Visa
            handleVisa={handleVisa}            
            />
        )}
        <h2 className='my-3 text-3xl'>PAYMENT GATEWAY</h2>          
        <p>choose a payment option below and fill out the appropriate information</p>
        <div className='flex my-4'>
            <button 
            className='px-4 bg-gray-300 border border-black mx-4 rounded-md'
            onClick={handleMpesa}
            >M-PESA</button>
            <button 
            className='px-4 bg-gray-300 border border-black mx-4 rounded-md'
            onClick={handleVisa}
            >VISA</button>
            <button className='px-4 bg-gray-300 border border-black mx-4 rounded-md'>PAY-PAL</button>
        </div>
    </div>
    </div>
    
    </>
  )
}

export default Payment;