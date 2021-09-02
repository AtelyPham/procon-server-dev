import TeamFactory from "./TeamFactory"
import AgentListFactory from "./AgentListFactory"
import TeamWithAgents from "./TeamWithAgents"

export default class TeamWithAgentFactory {
  createInstances(listSize: number, boardSize: number) {
    const [team0, team1] = new TeamFactory().createTeams()
    const [agents0, agents1] = new AgentListFactory(
      listSize,
      boardSize
    ).createAgentList()

    const wrapper0 = new TeamWithAgents(team0, agents0)
    const wrapper1 = new TeamWithAgents(team1, agents1)

    return [wrapper0, wrapper1]
  }
}
