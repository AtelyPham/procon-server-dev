import { isEqual, random } from "lodash"
import Coordinate from "../Coordinate"
import AgentList from "./AgentList"

export default class AgentListFactory {
  private _range: number
  private _size: number
  constructor(size: number, range: number) {
    this._size = size
    this._range = range
  }

  private genList() {
    const list1: Coordinate[] = []
    const list2: Coordinate[] = []

    for (let i = 0; i < this._size; i++) {
      do {
        const newCoor = {
          x: random(this._range - 1),
          y: random(this._range - 1),
        }

        const idx1 = list1.findIndex(coor => isEqual(coor, newCoor))
        const idx2 = list2.findIndex(coor => isEqual(coor, newCoor))

        if (idx1 === -1 && idx2 === -1) {
          list1.push(newCoor)
          list2.push({
            x: this._range - newCoor.x - 1,
            y: this._range - newCoor.y - 1,
          })
          break
        }
      } while (true)
    }

    return [list1, list2]
  }

  createAgentList() {
    const [list1, list2] = this.genList()

    const agentList1 = new AgentList(list1)
    const agentList2 = new AgentList(list2)

    return [agentList1, agentList2]
  }
}
