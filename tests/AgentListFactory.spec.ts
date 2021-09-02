import { expect } from "chai"
import { isEqual } from "lodash"
import AgentList from "../src/v1/types/classes/AgentList"
import AgentListFactory from "../src/v1/types/classes/AgentListFactory"

describe("Test for AgentListFactory class", () => {
  const range = 8
  const size = 3
  const factory = new AgentListFactory(size, range)
  const [agentList1, agentList2] = factory.createAgentList()

  it("Initialize object", () => {
    expect(agentList1).instanceof(AgentList)
    expect(agentList2).instanceof(AgentList)
  })

  describe("Check logic", () => {
    const list1 = Object.values(agentList1.entities).map(e => ({
      ...e.getCoor(),
    }))

    const list2 = Object.values(agentList2.entities).map(e => ({
      ...e.getCoor(),
    }))

    it("Checking for symetric between two agentlists", () => {
      expect(list1.length).to.eql(list2.length)

      list1.forEach(xy => {
        const itemIdx = list2.findIndex(({ x, y }) => {
          return x + xy.x === range - 1 && y + xy.y === range - 1
        })

        expect(itemIdx).not.eql(-1)

        list2.splice(itemIdx, 1)
      })
    })

    it("Checking for overlapping coordinate between two agentlists", () => {
      list1.forEach(c => {
        const idx = list2.findIndex(coor => isEqual(coor, c))
        expect(idx).to.equal(-1)
      })
      list2.forEach(c => {
        const idx = list1.findIndex(coor => isEqual(coor, c))
        expect(idx).to.equal(-1)
      })
    })
  })
})
