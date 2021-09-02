import AgentList from "../types/classes/AgentList"
import MatchList from "../types/classes/MatchList"
import TeamList from "../types/classes/TeamList"
import TeamWithAgents from "../types/classes/TeamWithAgents"
import { Action, Actions } from "../types/interfaces/Actions"

export const processActions = async (
  actions: Actions | null,
  teamWithAgents: TeamWithAgents | null
) => {
  if (!actions || !teamWithAgents) {
    return
  }

  actions.forEach((act: Action) => {
    processAction(act, teamWithAgents)
  })
}

export const processAction = (
  action: Action,
  teamWithAgents: TeamWithAgents
) => {
  const { team, agentList: agents } = teamWithAgents
  const { agentId, dx, dy, type } = action
  const match = MatchList.entities[team.matchId!]
  const [componentId] = match.teamIds.filter(id => id !== team.teamId)
  const { agentList: componentAgents } = TeamList.entities[componentId]

  if (type === "stay") {
    return
  }
  const agent = agents.entities[agentId]
  if (!agent) {
    return
  }

  let { x, y } = agent.getCoor()
  x += dx
  y += dy

  // Check if the position is the same with other agents' position
  if (!validPos(x, y, agents, componentAgents)) {
    return
  }

  const tileVal = match.tiles.values[x][y]
  const pointVal = match.board.values[x][y]
  if (type === "remove" && tileVal === componentId) {
    // Update tile value at position x, y
    match.tiles.removeTile(x, y)
    const componentTeam = TeamList.entities[componentId].team
    componentTeam.tilePoint.setPoint(componentTeam.tilePoint.point - pointVal)
  } else {
    if (tileVal === componentId) {
      return
    }

    if (tileVal === null) {
      match.tiles.updateTile(team.teamId, x, y)
      team.tilePoint.setPoint(team.tilePoint.point + pointVal)
    }

    agent.setCoor({ x, y })
  }
}

const validPos = (
  x: number,
  y: number,
  agents: AgentList,
  componentAgents: AgentList
) => {
  const coors = Object.values(agents.entities).map(agent => agent.getCoor())
  const componentCoors = Object.values(componentAgents.entities).map(agent =>
    agent.getCoor()
  )

  let idx = coors.findIndex(({ x: _x, y: _y }) => x === _x && y === _y)
  if (idx !== -1) {
    return false
  }
  idx = componentCoors.findIndex(({ x: _x, y: _y }) => x === _x && y === _y)
  if (idx !== -1) {
    return false
  }

  return true
}
