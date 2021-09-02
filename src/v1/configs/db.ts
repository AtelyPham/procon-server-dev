import { connect } from "mongoose"
import UserModel from "../models/User.model"
import config from "./"

export default {
  init: async (cb: () => void) => {
    await connect(config.DB_URI)
    cb()
  },
}

export const findUserByUserName = async (username: string) => {
  try {
    const res = await UserModel.findOne({ username }).exec()
    return res
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export const findUserById = async (id: string) => {
  try {
    const res = await UserModel.findById(id).exec()
    return res
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
