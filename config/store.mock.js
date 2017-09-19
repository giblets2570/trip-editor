import store from '../src/store'
import configureStore from 'redux-mock-store'

const configuredStore = configureStore()

global.mockStore = configuredStore(store.getState());