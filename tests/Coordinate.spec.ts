import { expect } from "chai"
import Coordiate from "../src/v1/types/classes/Coordinate"

describe("Test for Coordinate class", () => {
  let obj: Coordiate | undefined
  beforeEach(() => {
    obj = new Coordiate({ x: 1, y: 1 })
  })
  it("Initialize object", () => {
    const expectVal = { x: 1, y: 1 }
    const outputVal = obj!.getCoor()

    expect(outputVal).to.deep.equal(expectVal)
  })

  it("Checking for set coordinate to x and y", () => {
    const expectVal = { x: 2, y: 2 }

    obj!.setCoor({ x: 2, y: 2 })
    const outputVal = obj!.getCoor()

    expect(outputVal).to.deep.equal(expectVal)
  })

  it("Checking for set coordinate to y", () => {
    const expectVal = { x: 1, y: 3 }

    obj!.setCoor({ y: 3 })
    const outputVal = obj!.getCoor()

    expect(outputVal).to.deep.equal(expectVal)
  })

  it("Checking for set coordinate to x", () => {
    const expectVal = { x: 10, y: 1 }

    obj!.setCoor({ x: 10 })
    const outputVal = obj!.getCoor()

    expect(outputVal).to.deep.equal(expectVal)
  })
})
