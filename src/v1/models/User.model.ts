import { Schema, model } from "mongoose"

export interface User {
  username: string
  password: string
  isAdmin: boolean
}

const schema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
})

export default model<User>("User", schema)
