import { takeLatest, call, all, put } from 'redux-saga/effects'
import { userTypes } from './user.types'
import * as userActions from './user.actions'
import { axios } from '../../axios'
// import * as userServices from '../../services/user'

export function* login(email, password) {
    try {
        const { data } = yield axios.post('/api/login', {
            email,
            password,
        })
        yield put(userActions.loginUserSuccess(data))
    } catch (e) {
        yield put(userActions.loginUserFailure(e))
    }
}

// watcher/worker
export function* onLogin(payload) {
    yield takeLatest(userTypes.LOGIN_START, login, payload)
}

export function* userSagas() {
    yield all([call(onLogin)])
}
