import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(<Provider store={store}>
  <BrowserRouter><App/></BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
