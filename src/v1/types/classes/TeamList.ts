import List, { Entities } from "../interfaces/List"
import Singleton from "./Singleton"
import TeamWithAgents from "./TeamWithAgents"

export default class TeamList
  extends Singleton<TeamList>()
  implements List<TeamWithAgents>
{
  _ids: string[]
  _entities: Entities<TeamWithAgents>
  private constructor() {
    super()
    this._ids = []
    this._entities = {}
  }

  get ids() {
    return this._ids
  }

  get entities() {
    return this._entities
  }

  static get entities() {
    return this.getInstance().entities
  }

  static get ids() {
    return this.getInstance().ids
  }

  static _instance = new TeamList()

  public static getInstance() {
    return this._instance
  }

  public static addTeam(teamWithAgents: TeamWithAgents) {
    const team = teamWithAgents.team
    const idx = this.getInstance().ids.findIndex(i => i === team.teamId)

    if (idx !== -1) {
      return
    }

    this.getInstance().ids.push(team.teamId)
    this.getInstance().entities[team.teamId] = teamWithAgents
  }

  public static removeTeamById(id: string) {
    const ids = this.getInstance().ids
    const entities = this.getInstance().entities
    const idx = ids.findIndex(i => i === id)

    if (idx === -1) {
      return
    }

    ids.splice(idx, 1)
    const removeItem = entities[id]
    delete entities[id]
    return removeItem
  }

  public static reset() {
    this.getInstance()._ids = []
    this.getInstance()._entities = {}
    return TeamList
  }
}
