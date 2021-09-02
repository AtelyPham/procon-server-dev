import TeamList from "../types/classes/TeamList"
import Match from "../types/classes/Match"
import TeamWithAgents from "../types/classes/TeamWithAgents"

export const genMatchResponse = (match: Match) => {
  const [id0, id1] = match.teamIds
  const team0 = TeamList.entities[id0]
  const team1 = TeamList.entities[id1]

  const agent0 = reShapeAgent(team0)
  const agent1 = reShapeAgent(team1)

  const res = {
    matchId: match.matchId,
    teams: match.teamIds,
    tiles: match.tiles.values,
    board: match.board.values,
    agents: [...agent0, ...agent1],
    turnTime: match.timer.turnTime,
    totalTurns: match.timer.totalTurns,
  }

  return res
}

const reShapeAgent = ({ team, agentList }: TeamWithAgents) => {
  let entities = Object.values(agentList.entities)

  let agents = entities.map(agent => {
    const { x, y } = agent.getCoor()

    return {
      agentId: agent.agentId,
      teamId: team.teamId,
      x,
      y,
    }
  })

  return agents
}

export const genMatchResponseMinimal = (match: Match) => ({
  matchId: match.matchId,
  size: match.board.values.length,
  numOfAgents: TeamList.entities[match.teamIds[0]].agentList.ids.length,
  turnTime: match.timer.turnTime,
  totalTurns: match.timer.totalTurns,
})

export default genMatchResponse
