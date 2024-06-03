import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import app from './app'
import user from './user'

const persistConfig = {
    key: 'root',
    storage,
}

const appPersistConfig = {
    ...persistConfig,
    key: 'app',
    whitelist: ['currentLocation'],
}

const userPersistConfig = {
    ...persistConfig,
    key: 'user',
    // whitelist: ['user'],
}

export default combineReducers({
    app: persistReducer(appPersistConfig, app),
    user: persistReducer(userPersistConfig, user),
})
