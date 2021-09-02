import { expect } from "chai"
import TilePoint from "../src/v1/types/classes/TilePoint"

describe("Test for TilePoint class", () => {
  const tilePoint = new TilePoint()
  it("Initial value is 0", () => {
    expect(tilePoint.point).to.eql(0)
  })

  it("Change point when use setPoint method", () => {
    const point = tilePoint.setPoint(5).point
    const expectPoint = 5

    expect(point).to.eql(expectPoint)
  })
})
