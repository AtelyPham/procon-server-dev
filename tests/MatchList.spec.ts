import { expect } from "chai"
import MatchList from "../src/v1/types/classes/MatchList"
import Match from "../src/v1/types/classes/Match"

describe("Test for MatchList class", () => {
  it("Test initialize object", () => {
    expect(MatchList.getInstance).to.be.a("function")
    const list = MatchList.getInstance()

    const keys = ["_ids", "_entities"]
    expect(list).has.all.keys(keys)
  })

  it("Test add new match", () => {
    const match = new Match()

    const ids = MatchList.ids
    const entities = MatchList.entities
    expect(ids).to.contain(match.matchId)
    expect(Object.keys(entities)).to.contain(match.matchId)
    expect(Object.values(entities)).to.contain(match)
  })

  it("Test remove match", () => {
    const match = new Match()

    MatchList.removeMatchById(match.matchId)

    const list = MatchList.getInstance()
    expect(list.ids).not.contain(match.matchId)
    expect(Object.keys(list.entities)).to.not.contain(match.matchId)
    expect(Object.values(list.entities)).to.not.contain(match)
  })
})
