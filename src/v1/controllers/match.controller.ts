import { Request, Response } from "express"
import { TokenExpiredError } from "jsonwebtoken"
import errorMsg from "../configs/errors"
import {
  genMatchResponse,
  genMatchResponseMinimal,
} from "../helpers/genMatchResponse"
import genResObj from "../helpers/genResObj"
import { generateToken, validateToken } from "../helpers/jwtHelpers"
import actionRegistry from "../types/classes/ActionRegistry"
import Match from "../types/classes/Match"
import MatchList from "../types/classes/MatchList"
import TeamList from "../types/classes/TeamList"
import ResponseType from "../types/ResponseType"

export const getMatches = async (req: Request, res: Response) => {
  const { ids, entities } = MatchList.getInstance()

  const responseList = ids.map(id => {
    const match = entities[id]

    return genMatchResponseMinimal(match)
  })

  const resObj: ResponseType = {
    success: true,
    error: null,
    data: responseList,
  }

  res.json(resObj)
}

export const getMatch = async (req: Request, res: Response) => {
  const id = req.params.id
  const match = MatchList.entities[id]
  const token = req.body.token

  if (!match) {
    const { code, msg } = errorMsg.notFound
    return res.status(code).json(genResObj(msg, null))
  }

  if (!token) {
    const [id0, id1] = match.teamIds
    try {
      const tokens = await Promise.all([
        generateToken({ data: id0, iat: Date.now() }),
        generateToken({ data: id1, iat: Date.now() }),
      ])

      return res.json(
        genResObj(null, {
          match: genMatchResponse(match),
          team1: {
            token: tokens[0],
            teamId: id0,
            tilePoint: 0,
          },
          team2: {
            token: tokens[1],
            teamId: id1,
            tilePoint: 0,
          },
        })
      )
    } catch (error) {
      const { code, msg } = errorMsg.serverError
      return res.status(code).json(genResObj(msg, null))
    }
  }

  try {
    const payload = await validateToken(token)
    if (typeof payload === "string") {
      const { code, msg } = errorMsg.invalidToken
      return res.status(code).send(genResObj(msg, null))
    }

    const tilePoint = TeamList.entities[payload.data].team.tilePoint.point
    const intervalTime = 5 // default interval time for server
    let nextTurnAtUnixTime: number = -1
    const { curTeam, curTime, turnTime } = match.timer
    if (payload.data === match.teamIds[curTeam]) {
      nextTurnAtUnixTime =
        Math.floor(Date.now() / 1000) + 2 * (turnTime + intervalTime) - curTime
    } else {
      nextTurnAtUnixTime =
        Math.floor(Date.now() / 1000) + (turnTime + intervalTime) - curTime
    }

    res.json(
      genResObj(null, {
        match: genMatchResponse(match),
        team: {
          teamId: payload.data,
          tilePoint,
          nextTurnAtUnixTime,
        },
      })
    )
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const { code, msg } = errorMsg.tokenExpired
      return res.status(code).send(genResObj(msg, null))
    }
    const { code, msg } = errorMsg.serverError
    res.status(code).send(genResObj(msg, null))
  }
}

export const deleteMatch = async (req: Request, res: Response) => {
  const id = req.params.id
  const match = MatchList.entities[id]

  if (!id || !match) {
    const { code, msg } = errorMsg.notFound
    return res.status(code).send(genResObj(msg, null))
  }

  if (match.timer.getStatus() === "running") {
    const { code, msg } = errorMsg.matchRunningError
    return res.status(code).send(genResObj(msg, null))
  }

  MatchList.removeMatchById(id)
  res.status(200).send(genResObj(null, { msg: "Match deleted!" }))
}

export const postCreateMatch = async (req: Request, res: Response) => {
  let resObj: ResponseType
  const match = new Match(req.body)
  const [id0, id1] = match.teamIds

  try {
    const tokens = await Promise.all([
      generateToken({ data: id0, iat: Date.now() }),
      generateToken({ data: id1, iat: Date.now() }),
    ])

    resObj = {
      success: true,
      error: null,
      data: {
        match: genMatchResponse(match),
        team1: {
          token: tokens[0],
          teamId: id0,
        },
        team2: {
          token: tokens[1],
          teamId: id1,
        },
      },
    }

    res.json(resObj)
  } catch (error) {
    const { code, msg } = errorMsg.serverError
    res.status(code).json(genResObj(msg, null))
  }
}

export const postStartMatch = async (req: Request, res: Response) => {
  const payload = req.jwt

  if (!payload || typeof payload === "string") {
    const { code, msg } = errorMsg.badRequest
    return res.status(code).send(genResObj(msg, null))
  }

  const teamId = payload.data
  const team = TeamList.entities[teamId]?.team
  if (!team || !team.matchId) {
    const { code, msg } = errorMsg.invalidToken
    return res.status(code).json(genResObj(msg, null))
  }

  const match = MatchList.entities[team.matchId]
  if (!match) {
    const { code, msg } = errorMsg.invalidToken
    return res.status(code).json(genResObj(msg, null))
  }

  if (!match.startMatch()) {
    const { code, msg } = errorMsg.badRequest
    return res.status(code).send(genResObj(msg, null))
  }

  const resObj = genResObj(null, {
    msg: "The game started!",
  })
  res.send(resObj)
}

export const postStopMatch = async (req: Request, res: Response) => {
  if (typeof req.jwt === "string" || !req.jwt) {
    const { code, msg } = errorMsg.invalidToken
    return res.status(code).json(genResObj(msg, null))
  }

  const teamId = req.jwt.data
  const team = TeamList.entities[teamId]?.team
  if (!team || !team.matchId) {
    const { code, msg } = errorMsg.badRequest
    return res.status(code).json(genResObj(msg, null))
  }

  const match = MatchList.entities[team.matchId]
  if (!match) {
    const { code, msg } = errorMsg.badRequest
    return res.status(code).json(genResObj(msg, null))
  }

  match.stopMatch()
  const resObj = genResObj(null, {
    msg: "The game stopeed!",
  })
  res.send(resObj)
}

export const postActionMatch = async (req: Request, res: Response) => {
  const actions = req.body["actions"]
  const teamWithAgents = req.proconData!.teamWithAgents!

  actionRegistry.setValue(actions, teamWithAgents)

  res.json(
    genResObj(null, {
      msg: "Action received!",
      actions,
    })
  )
}

export default {
  getMatches,
  getMatch,
  deleteMatch,
  postCreateMatch,
  postStartMatch,
  postStopMatch,
  postActionMatch,
}
