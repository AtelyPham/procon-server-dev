export default abstract class Point {
  protected _point!: number
  abstract setPoint(point: number): this
}
