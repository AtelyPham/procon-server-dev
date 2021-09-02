import { expect } from "chai"
import AgentList from "../src/v1/types/classes/AgentList"
import Team from "../src/v1/types/classes/Team"
import TeamWithAgentFactory from "../src/v1/types/classes/TeamWithAgentsFactory"
import "./Global.spec"

describe("Test for TeamWithAgentFactory class", () => {
  it("Initilized object", () => {
    const listSize = 3
    const boardSize = 8
    const factory = new TeamWithAgentFactory()

    const [team0, team1] = factory.createInstances(listSize, boardSize)

    expect(team0.team).instanceof(Team)
    expect(team1.team).instanceof(Team)
    expect(team0.agentList).instanceof(AgentList)
    expect(team1.agentList).instanceof(AgentList)
  })
})
