import { expect } from "chai"
import MainBoard from "../src/v1/types/classes/MainBoard"
import Match from "../src/v1/types/classes/Match"
import TileBoard from "../src/v1/types/classes/TileBoard"
import Timer from "../src/v1/types/classes/Timer"
import MatchOpts from "../src/v1/types/interfaces/MatchOpts"
import "./Global.spec"

describe("Test for Match class", () => {
  it("Initialize object with no argument", () => {
    const match = new Match()

    const keys = ["matchId", "timer", "board", "tiles", "teamIds"]
    expect(match).have.all.keys(keys)
    const { matchId, timer, board, tiles, teamIds } = match
    expect(matchId).to.be.a("string")
    expect(timer).instanceOf(Timer)
    expect(board).instanceof(MainBoard)
    expect(board.values.length).equal(8) // default size
    expect(tiles).instanceof(TileBoard)
    expect(tiles.values.length).equal(8)
    expect(teamIds.length).eql(2)
    expect(teamIds[0]).to.be.a("string")
    expect(teamIds[1]).to.be.a("string")
  })

  it("Initialize object with argument option", () => {
    const opts: MatchOpts = {
      size: 10,
      turnTime: 20,
      totalTurns: 7,
      minPoint: -3,
      maxPoint: 10,
    }
    const match = new Match(opts)
    const { matchId, timer, board, tiles, teamIds } = match

    const expSize = 10

    expect(matchId).to.be.a("string")
    expect(board).instanceof(MainBoard)
    expect(board.values.length).equal(expSize)
    expect(tiles).instanceof(TileBoard)
    expect(tiles.values.length).equal(expSize)
    expect(teamIds.length).eql(2)
    expect(teamIds[0]).to.be.a("string")
    expect(teamIds[1]).to.be.a("string")
  })
})
