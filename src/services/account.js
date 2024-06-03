import { adminAxios, authAxios, axios } from '../axios'
import { accountApi } from '../api'

export const getAllAccount = () => {
   return adminAxios.get(accountApi.getAllAccount)
}

export const getAllRole = () => {
   return adminAxios.get(accountApi.getAllRole)
}

export const lockAccount = userId => {
   return adminAxios.get(accountApi.lockAccount, { params: { userId } })
}

export const phanQuyen = (userId, roleId) => {
   return adminAxios.post(accountApi.editAccountRole, {
      userId,
      roleId,
   })
}
