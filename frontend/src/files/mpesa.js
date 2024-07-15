import React,{useState} from 'react'
import ReactDOM from 'react-dom';

function Mpesa({handleMpesa}) {

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    amount: '', 
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const initiatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/stkPush', formData);  
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <input 
                placeholder='Name' 
                className='border-b border-gray-400 w-2/3 pb-2 outline-none'
                name='name'
                id='name'
                autoComplete='off'          
                value={formData.name}
                onChange={handleChange}
                />

                <input 
                placeholder='Email' 
                className='border-b border-gray-400 w-2/3 py-2 outline-none'
                name='email'
                id='email'
                autoComplete='off'          
                value={formData.email}
                onChange={handleChange}
                />

                <input 
                placeholder='Address' 
                className='border-b border-gray-400 w-2/3 py-2 outline-none'
                name='address'
                id='address'
                autoComplete='off'          
                value={formData.address}
                onChange={handleChange}
                />

                <input 
                placeholder='Amount' 
                className='border-b border-gray-400 w-2/3 py-2 outline-none'                
                name='amount'
                id='amount'
                autoComplete='off'          
                value={formData.amount}
                onChange={handleChange}/>

                <textarea
                placeholder='instructions'
                className='border border-gray-400 w-2/3 py-2 my-6 outline-none rounded-sm'
                />
            </div>

            <button
            type='submit'
            className='bg-red-500 px-6 rounded-sm text-white py-1 my-4'
            onClick={initiatePayment}
            >checkout            
            </button>
        </div>    
    </div>
    </>
    ,document.getElementById('mpesa')
  )
}
export default Mpesa;