import Point from "./Point"

export default class TilePoint extends Point {
  _point: number = 0
  TilePoint(point: number = 0) {
    this._point = point
  }

  setPoint(point: number) {
    this._point = point
    return this
  }

  get point() {
    return this._point
  }
}
