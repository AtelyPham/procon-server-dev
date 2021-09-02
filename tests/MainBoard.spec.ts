import { expect } from "chai"
import { inRange } from "lodash"
import MainBoard from "../src/v1/types/classes/MainBoard"

describe("Test for MainBoard class", () => {
  it("Initilize object", () => {
    const size = 8
    const minRange = -3
    const maxRange = 10
    const mainBoard = new MainBoard(size, minRange, maxRange)

    expect(mainBoard).to.has.property("values")
    const arr = mainBoard.values

    expect(arr.length).to.eql(size)
    expect(arr[0].length).to.eql(size)

    arr.forEach(element => {
      element.forEach(item => {
        expect(inRange(item, minRange, maxRange + 1)).to.be.true
      })
    })
  })
})
