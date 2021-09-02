import CoordinateType from "../Coordinate"
import { nanoid } from "nanoid"
import config from "../../configs"
import Coordinate from "./Coordinate"

export default class Agent extends Coordinate {
  private _agentId: string

  constructor(coordinate: CoordinateType) {
    super(coordinate)
    this._agentId = nanoid(config.ID_LENGTH)
  }

  get agentId() {
    return this._agentId
  }
}
