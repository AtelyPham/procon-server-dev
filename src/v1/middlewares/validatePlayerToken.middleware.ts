import TeamList from "../types/classes/TeamList"
import { NextFunction, Request, Response } from "express"
import { verify, JwtPayload } from "jsonwebtoken"
import config from "../configs"
import ResponseType from "../types/ResponseType"
import genResObj from "../helpers/genResObj"

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.body["token"]

  let resObj: ResponseType

  if (!token) {
    resObj = {
      success: false,
      error: "Invalid token!",
    }
    return res.status(400).json(resObj)
  }

  try {
    const payload: JwtPayload | string = verify(token, config.SECRET)
    if (typeof payload === "string" || !validTeamId(payload.data)) {
      return res.status(400).send(genResObj("Invalid token!", null))
    }

    req.jwt = payload
    next()
  } catch (error) {
    resObj = {
      success: false,
      error: "Invalid token!",
    }
    return res.status(400).json(resObj)
  }
}

const validTeamId = (teamId: string) => {
  const team = TeamList.entities[teamId]
  if (!team) {
    return false
  }
  return true
}
