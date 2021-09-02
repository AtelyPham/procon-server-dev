import { Request } from "express"
import errorMsg from "../configs/errors"

export default async (req: Request) => {
  const { authorization } = req.headers
  const { msg } = errorMsg.unauthorized
  if (!authorization) {
    return Promise.reject(msg)
  }
  const [scheme, token] = authorization.split(" ")
  if (scheme.toLowerCase() !== "bearer" || !token) {
    return Promise.reject(msg)
  }
  return Promise.resolve(token)
}
