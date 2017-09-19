import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'react-dates/lib/css/_datepicker.css'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import App from './components/App'
import PrintPage from './components/PrintPage'
import store from './store'
import registerServiceWorker from './registerServiceWorker'

const app = document.getElementById('react-no-print')
// Creating the page that will be printed
const printPage = document.getElementById('print-mount')

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	app
)

ReactDOM.render(
	<Provider store={store}>
		<PrintPage />
	</Provider>, 
	printPage
)

registerServiceWorker()