import AgentListEntities from "../AgentListEntities"
import Coordinate from "../Coordinate"
import Agent from "./Agent"
import List from "../interfaces/List"

export default class AgentList implements List<Agent> {
  _ids: string[]
  _entities: AgentListEntities

  constructor(coordinates: Coordinate[]) {
    this._ids = []
    this._entities = {}
    coordinates.forEach(coor => {
      const agent = new Agent(coor)

      this._ids.push(agent.agentId)
      this._entities[agent.agentId] = agent
    })
  }

  public get ids() {
    return this._ids
  }

  public get entities() {
    return this._entities
  }

  public updateCoorById(id: string, coordinate: Coordinate) {
    const agent = this._entities[id]

    if (agent) {
      agent.setCoor(coordinate)
    }

    return agent
  }
}
