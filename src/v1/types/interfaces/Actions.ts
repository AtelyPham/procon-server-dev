export interface Action {
  agentId: string
  dx: -1 | 0 | 1
  dy: -1 | 0 | 1
  type: "move" | "stay" | "remove"
}

export type Actions = Action[]
