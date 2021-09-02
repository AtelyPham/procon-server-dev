import { validateToken } from "./../helpers/jwtHelpers"
import { Request, Response, NextFunction } from "express"
import errorMsg from "../configs/errors"
import genResObj from "../helpers/genResObj"

const getToken = (req: Request) => {
  const { authorization } = req.headers
  if (authorization && typeof authorization === "string") {
    const [scheme, token] = authorization.split(" ")
    if (scheme.toLowerCase() !== "bearer" || !token) {
      return null
    } else {
      return token
    }
  } else if (req.body["token"]) {
    return req.body["token"]
  } else {
    return null
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req)
  if (!token) {
    const { code, msg } = errorMsg.unauthorized
    return res.status(code).json(genResObj(msg, null))
  }
  try {
    const payload = await validateToken(token)
    req.jwt = payload
    next()
  } catch (error) {
    const { code, msg } = errorMsg.serverError
    res.status(code).json(genResObj(msg, null))
  }
}
