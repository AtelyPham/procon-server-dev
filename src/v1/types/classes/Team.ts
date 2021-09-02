import TilePoint from "./TilePoint"
import { nanoid } from "nanoid"
import config from "../../configs"
import Admin from "./Admin"

export default class Team {
  private _teamId: string
  private _matchId: string | null
  private _tilePoint: TilePoint
  private _isAdmin: Admin | null
  constructor(admin?: Admin) {
    this._teamId = nanoid(config.ID_LENGTH)
    this._matchId = null
    this._tilePoint = new TilePoint()
    this._isAdmin = admin || null
  }

  public setMatchId(matchId: string) {
    this.matchId = matchId
  }

  public get matchId() {
    return this._matchId
  }

  public set matchId(id) {
    this._matchId = id
  }

  public get teamId() {
    return this._teamId
  }

  public get tilePoint() {
    return this._tilePoint
  }

  public get isAdmin() {
    return this._isAdmin
  }
}
