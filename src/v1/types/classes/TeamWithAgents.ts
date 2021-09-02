import Team from "./Team"
import AgentList from "./AgentList"
import TeamList from "./TeamList"

export default class TeamWithAgents {
  team: Team
  agentList: AgentList

  constructor(team: Team, agentList: AgentList) {
    this.team = team
    this.agentList = agentList
    TeamList.addTeam(this)
  }
}
