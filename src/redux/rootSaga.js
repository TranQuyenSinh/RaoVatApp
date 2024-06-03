import { all, call } from 'redux-saga/effects'
import { appSagas } from './app/app.sagas'

export function* rootSaga() {
    yield all([call(appSagas)])
}
