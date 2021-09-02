import { Actions } from "../interfaces/Actions"
import TeamWithAgents from "./TeamWithAgents"

class ActionRegistry {
  actions: Actions | null = null
  teamWithAgents: TeamWithAgents | null = null
  constructor() {}

  setValue(actions: Actions, team: TeamWithAgents) {
    this.actions = actions
    this.teamWithAgents = team
  }

  setNull() {
    this.actions = this.teamWithAgents = null
  }
}

export default new ActionRegistry()
