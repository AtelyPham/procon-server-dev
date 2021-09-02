import { verify } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import genResObj from "../helpers/genResObj"
import config from "../configs"
import errorMsg from "../configs/errors"
import getTokenFromHeader from "../helpers/getTokenFromHeader"

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = await getTokenFromHeader(req)
    verify(token, config.SECRET, (error, payload) => {
      if (error) {
        console.error(error)
        const { code, msg } = errorMsg.serverError
        return res.status(code).json(genResObj(msg, null))
      }
      req.jwt = payload
      next()
    })
  } catch (error) {
    console.error(error)
    const { code, msg } = errorMsg.badRequest
    res.status(code).send(genResObj(msg, null))
  }
}
