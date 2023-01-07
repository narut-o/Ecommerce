import React from 'react';
import ReactDOM from 'react-dom/client';
import reducers from './reducers';
import thunk from "redux-thunk"
import {legacy_createStore as createStore,applyMiddleware,compose} from "redux"
import {Provider} from 'react-redux';
import App from './App';
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';


const options={
     timeout:5000,
     position:positions.BOTTOM_LEFT,
     transition:transitions.SCALE
}


const initialState = {
     cart:{
          cartItems: localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
          shippingInfo:localStorage.getItem('shippingInfo')?JSON.parse(localStorage.getItem('shippingInfo')):{}
     },
    
}
const middleware = [thunk];
const store = createStore(reducers,initialState, compose(applyMiddleware(...middleware)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store} >
<AlertProvider template = {AlertTemplate} {...options} >
  
     <App />

     </AlertProvider>
</Provider>
 

);

