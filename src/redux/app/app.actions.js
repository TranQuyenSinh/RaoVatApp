import { appTypes } from './app.types'

export const changeCustomerLocation = location => ({
    type: appTypes.CHANGE_CUSTOMER_LOCATION,
    payload: location,
})
