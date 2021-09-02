import { expect } from "chai"
import TeamList from "../src/v1/types/classes/TeamList"
import TeamWithAgentFactory from "../src/v1/types/classes/TeamWithAgentsFactory"
import "./Global.spec"

describe("Test for TeamList Singleton class", () => {
  it("Initialize object", () => {
    const teamList = TeamList.getInstance()
    expect(teamList.ids).to.be.empty
    expect(teamList.ids).to.be.a("array")
    expect(teamList.entities).to.be.empty
    expect(teamList.entities).to.be.a("object")
  })

  describe("Check add and remove logic", () => {
    TeamList.reset()
    const listSize = 3
    const boardSize = 10
    it("Check when add team", () => {
      const ids = TeamList.getInstance().ids
      const entities = TeamList.getInstance().entities
      const [team0, team1] = new TeamWithAgentFactory().createInstances(
        listSize,
        boardSize
      )

      expect(ids).contain(team0.team.teamId)
      expect(Object.values(entities)).contain(team0)
      expect(Object.keys(entities)).contain(team0.team.teamId)

      expect(ids).contain(team1.team.teamId)
      expect(Object.values(entities)).contain(team1)
      expect(Object.keys(entities)).contain(team1.team.teamId)
    })

    it("Check when remove team", () => {
      const ids = TeamList.getInstance().ids
      const entities = TeamList.getInstance().entities
      const [team0, team1] = new TeamWithAgentFactory().createInstances(
        listSize,
        boardSize
      )
      let teamRemoved = TeamList.removeTeamById(team0.team.teamId)

      expect(teamRemoved).is.not.undefined
      if (teamRemoved) {
        expect(ids).to.not.include(teamRemoved.team.teamId)
        expect(entities).to.not.include(teamRemoved)
      }
      teamRemoved = TeamList.removeTeamById(team1.team.teamId)

      expect(teamRemoved).is.not.undefined
      if (teamRemoved) {
        expect(ids).to.not.include(teamRemoved.team.teamId)
        expect(entities).to.not.include(teamRemoved)
      }
    })
  })
})
