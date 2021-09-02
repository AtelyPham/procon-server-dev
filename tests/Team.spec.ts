import { expect } from "chai"
import Admin from "../src/v1/types/classes/Admin"
import Team from "../src/v1/types/classes/Team"
import "./Global.spec"

describe("Test for Team class", () => {
  it("Check field when initialize object", () => {
    const team = new Team()

    const keys = ["_teamId", "_tilePoint", "_matchId", "_isAdmin"]
    expect(team).to.have.all.keys(...keys)
    expect(team.teamId).is.not.empty
    expect(team.tilePoint.point).to.equal(0)
    expect(team.matchId).is.null
    expect(team.isAdmin).is.null
  })

  it("Check when team is admin", () => {
    const team = new Team(new Admin())

    expect(team.isAdmin).instanceof(Admin)
  })
})
