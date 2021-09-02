import TeamList from "../types/classes/TeamList"
import { NextFunction } from "express"
import { Request, Response } from "express"
import genResObj from "../helpers/genResObj"
import MatchList from "../types/classes/MatchList"

export default (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.jwt === "string") {
    return res.status(400).json(genResObj("Invalid token!", null))
  }

  const teamId = req.jwt!.data
  const teamWithAgents = TeamList.entities[teamId]
  const matchId = teamWithAgents.team.matchId
  if (!matchId || !MatchList.entities[matchId]) {
    return res.status(400).json(genResObj("Invalid token!", null))
  }

  const match = MatchList.entities[matchId]
  const curId = match.teamIds[match.timer.curTeam]
  if (curId !== teamId || match.timer.isServer) {
    return res.status(400).json(genResObj("Not your turn!", null))
  }

  if (match.timer.getStatus() !== "running") {
    return res.status(400).json(genResObj("Match is not runnning!", null))
  }

  req.proconData = {
    match,
    teamWithAgents,
  }

  next()
}
