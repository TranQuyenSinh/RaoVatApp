import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import rootReducer from './rootReducer'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, sagaMiddleware]

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)

export default { store, persistor }
