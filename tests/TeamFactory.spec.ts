import { expect } from "chai"
import Team from "../src/v1/types/classes/Team"
import TeamFactory from "../src/v1/types/classes/TeamFactory"
import "./Global.spec"

describe("Test for TeamFactory class", () => {
  const [team0, team1] = new TeamFactory().createTeams()
  it("Check when initialize object", () => {
    expect(team0).instanceof(Team)
    expect(team1).instanceof(Team)
  })

  it("Check for admin", () => {
    expect(team0.isAdmin).is.not.null
    expect(team1.isAdmin).is.null
  })
})
