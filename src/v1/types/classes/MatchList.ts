import Singleton from "./Singleton"
import Match from "./Match"
import List, { Entities } from "../interfaces/List"
import TeamList from "./TeamList"

export default class MatchList
  extends Singleton<MatchList>()
  implements List<Match>
{
  _ids: string[]
  _entities: Entities<Match>

  private constructor() {
    super()
    this._ids = []
    this._entities = {}
  }

  get ids() {
    return this._ids
  }

  static get ids() {
    return this._instance._ids
  }

  get entities() {
    return this._entities
  }

  static get entities() {
    return this._instance._entities
  }

  static _instance = new MatchList()

  public static getInstance() {
    return this._instance
  }

  public static addMatch(match: Match) {
    const idx = this.ids.findIndex(i => i === match.matchId)

    if (idx !== -1) {
      return
    }

    this.ids.push(match.matchId)
    this.entities[match.matchId] = match
  }

  public static removeMatchById(id: string) {
    const idx = this.ids.findIndex(i => i === id)

    if (idx === -1) {
      return
    }

    const [id0, id1] = this.entities[id].teamIds
    TeamList.removeTeamById(id0)
    TeamList.removeTeamById(id1)

    this.ids.splice(idx, 1)
    const removeItem = this.entities[id]
    delete this.entities[id]
    return removeItem
  }

  public reset() {
    this._ids = []
    this._entities = {}
  }
}
