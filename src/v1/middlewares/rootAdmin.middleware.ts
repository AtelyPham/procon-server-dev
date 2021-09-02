import { NextFunction, Request, Response } from "express"
import { findUserById } from "../configs/db"
import errorMsg from "../configs/errors"
import genResObj from "../helpers/genResObj"
import getTokenFromHeader from "../helpers/getTokenFromHeader"
import { validateToken } from "../helpers/jwtHelpers"

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await getTokenFromHeader(req)
    const payload = await validateToken(token)
    if (typeof payload.sub !== "string") {
      const { code, msg } = errorMsg.badRequest
      return res.status(code).json(genResObj(msg, null))
    }
    const user = await findUserById(payload.sub)
    if (user?.isAdmin) {
      return next()
    }
    const { code, msg } = errorMsg.badRequest
    return res.status(code).json(genResObj(msg, null))
  } catch (error) {
    console.error(error)
    const { code, msg } = errorMsg.badRequest
    return res.status(code).json(genResObj(msg, null))
  }
}
