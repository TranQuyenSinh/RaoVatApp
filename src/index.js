import 'bootstrap/dist/css/bootstrap.css'
import '@popperjs/core/dist/esm/index'
import 'bootstrap/dist/js/bootstrap.bundle'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { CustomBrowserRouter } from './routes/CustomBrowserRouter'
import '@fortawesome/fontawesome-free/css/all.min.css'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
    <Provider store={store}>
        <CustomBrowserRouter basename={baseUrl}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </CustomBrowserRouter>
    </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
