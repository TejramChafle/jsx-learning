import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './store/student/reducer';
import thunk from 'redux-thunk';


// import axios from 'axios';

/* axios.interceptors.request.use(request=> {
  // console.log(request);
}); */

const logger = store => {
	return next => {
		return action => {
			// console.log('Middleware dispatching action: ', action );
			const result = next(action);
			// console.log('Middleware next state', store.getState());
			return result;
		}
	}
}

const store = createStore(reducer, applyMiddleware(logger, thunk));

ReactDOM.render(
	<React.Fragment>
		<BrowserRouter>
			<Provider store={store} >
				<App />
			</Provider>
		</BrowserRouter>
	</React.Fragment>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
