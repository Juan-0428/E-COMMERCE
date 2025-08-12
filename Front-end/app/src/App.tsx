import { BrowserRouter, Routes } from 'react-router-dom';
import {Route } from 'react-router-dom';
import Initialization from './Init';
import NotFound from './NotFound';
import Footer from "@components/Footer"
import { useLocation } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';
import Forms from 'forms';
import Commerce from 'Commerce';
import RecoverPassword from 'password';


function Dinamic_Content(){
  const location = useLocation().pathname;
  const refFooter = useRef<HTMLLabelElement>(null);
  useEffect(()=>{
    if (refFooter.current){
      refFooter.current.textContent = location.toString();
    }
  },[location])

  return (
    <>
    <Suspense fallback={<div>...Cargando</div>}>
      <Routes>
        
          <Route path='/' element={<Initialization/>} />
          <Route path='*'errorElement={<NotFound/>} element= {<NotFound/>}/>
          <Route path='/form:mode' element= {<Forms/>}/>
          <Route path='/commerce:session' element={<Commerce/>}/>
          <Route path='/arrangePassword:user' element={<RecoverPassword/>}/>
      </Routes>
    </Suspense>
    <Footer  resource= {location} ref={refFooter}></Footer>
    </>
  )

}
export default function App(){


  return (
    <>
      <BrowserRouter>
        <Dinamic_Content></Dinamic_Content> 
      </BrowserRouter>
    </>
  )
}
