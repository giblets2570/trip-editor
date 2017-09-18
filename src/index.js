import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'react-dates/lib/css/_datepicker.css';
import './index.css'
import { Provider } from 'react-redux'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import PrintPage from './components/PrintPage'

import store from './store'

const app = document.getElementById('react-no-print');
const printPage = document.getElementById('print-mount');

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	app
);

ReactDOM.render(
	<Provider store={store}>
		<PrintPage />
	</Provider>, 
	printPage
);

registerServiceWorker();