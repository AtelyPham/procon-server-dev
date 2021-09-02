import Board from "../interfaces/Board"
import TeamWithAgents from "./TeamWithAgents"

type T = TeamWithAgents

export default class TileBoard implements Board<string | null> {
  _values: (string | null)[][]
  constructor(size: number) {
    this._values = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    )
  }

  public get values() {
    return this._values
  }

  updateTile(id: string, x: number, y: number): void {
    if (x < 0 || x >= this.values.length || y < 0 || y >= this.values.length) {
      return
    }

    this._values[x][y] = id
  }

  removeTile(x: number, y: number) {
    if (x < 0 || x >= this.values.length || y < 0 || y >= this.values.length) {
      return
    }

    this._values[x][y] = null
  }
}
