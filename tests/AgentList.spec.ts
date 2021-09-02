import TypeCoordinate from "../src/v1/types/Coordinate"
import AgentList from "../src/v1/types/classes/AgentList"
import Agent from "../src/v1/types/classes/Agent"
import { expect } from "chai"

describe("Test for AgentList class", () => {
  const coorList: TypeCoordinate[] = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ]
  const agentList = new AgentList(coorList)
  it("Initialize object", () => {
    const ids = agentList.ids
    const id = ids[0]
    const agent = agentList.entities[id]

    expect(ids.length).to.eql(2)
    expect(agent).instanceof(Agent)
  })

  it("Test for update position by id", () => {
    const id = agentList.ids[0]
    const agent = agentList.entities[id]
    const expectVal = { x: 3, y: 0 }

    const outputVal = agentList.updateCoorById(id, expectVal)

    expect(outputVal).instanceof(Agent)
    expect(outputVal.getCoor()).to.deep.equal(expectVal)
  })
})
