import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createStore ,applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import reducers from './reducers';


const store = createStore(reducers,compose(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}> <App/> </Provider>,document.querySelector("#root"));