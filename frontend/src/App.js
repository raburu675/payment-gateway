import React from 'react';
import './App.css';
import Payment from './files/payment';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App() {
  return (      
        <BrowserRouter>            
        <Payment/>    
          {/* <Routes className=''>
            <Route path='/' element={<Home/>} />
         </Routes> */}
        </BrowserRouter>
  );
}

export default App;