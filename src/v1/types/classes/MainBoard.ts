import assert from "assert"
import { random } from "lodash"
import Board from "../interfaces/Board"

export default class MainBoard implements Board<number> {
  readonly _values: number[][]
  constructor(size: number, min: number, max: number) {
    assert(size > 0, "MainBoard size argument must larger than 0")

    this._values = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => random(min, max))
    )
  }

  get values() {
    return this._values
  }
}
