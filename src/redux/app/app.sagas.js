import { put, takeLatest } from 'redux-saga/effects'
import * as appAction from './app.actions'
import { appTypes } from './app.types'
import { getAllDistricts } from '../../services'

export function* fetchAllDistricts(provinceCode) {
    // let {
    //     data: { name, code, districts },
    // } = yield getAllDistricts(provinceCode)
    // yield put(appAction.changeCustomerLocation(provinceCode))
}

export function* onChangeLocation(location) {
    // yield takeLatest(appTypes.CHANGE_CUSTOMER_LOCATION, fetchAllDistricts, location.code)
}

export function* appSagas() {
    // yield all([call(testSagas, appSagas)])
}
