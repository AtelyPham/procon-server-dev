import CoordinateType from "../Coordinate"

type TypeCoordinateOptionalX = {
  x?: number
  y: number
}

type TypeCoordinateOptionalY = {
  x: number
  y?: number
}

type TypeCoordinateOptional = TypeCoordinateOptionalX | TypeCoordinateOptionalY

export default class Coordinate {
  private _x: number
  private _y: number
  constructor(coordinate: CoordinateType) {
    this._x = coordinate.x
    this._y = coordinate.y
  }

  public getCoor(): CoordinateType {
    const obj: CoordinateType = {
      x: this._x,
      y: this._y,
    }
    return obj
  }

  public setCoor(coordinate: TypeCoordinateOptional) {
    const { x, y } = coordinate
    if (typeof x === "number" && !isNaN(x)) {
      this._x = x
    }

    if (typeof y === "number" && !isNaN(y)) {
      this._y = y
    }
  }
}
