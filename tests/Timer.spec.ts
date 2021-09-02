/*
import { expect } from "chai"
import Timer from "../src/v1/types/classes/Timer"

describe("Test for Timer class", () => {
  const intervalTime = 5
  const turnTime = 10
  const totalTurns = 5
  let timer = new Timer(intervalTime, turnTime, totalTurns)
  it("Initialize object", () => {
    const keys = [
      "turnTime",
      "totalTurns",
      "intervalTime",
      "curTurn",
      "curTime",
      "curTeam",
      "isServer",
      "intervalId",
    ]
    expect(timer).to.have.all.keys(keys)
    expect(timer.start).to.be.a("function")
    expect(timer.stop).to.be.a("function")
    expect(timer.curTurn).equal(0)
    expect(timer.curTime).equal(0)
    expect(timer.curTeam).equal(0)
    expect(timer.isServer).is.true
  })

  it("Check for start timer", function () {
    this.timeout((intervalTime + turnTime) * 1000 + 1000)
    timer.start()

    const a = () =>
      new Promise(res => {
        setTimeout(() => {
          expect(timer.curTeam).equal(0)
          expect(timer.isServer).is.false
        }, 500)

        setTimeout(() => {
          expect(timer.isServer).is.true
          timer.stop()
          res("abc")
        }, turnTime * 1000 + 1000)
      })

    return a()
  })
})
*/
