import { processActions } from "./../../helpers/processAction"
import actionRegistry from "./ActionRegistry"

export default class Timer {
  private status: "idle" | "running" | "stoped" = "idle"
  private intervalTime: number
  turnTime: number
  totalTurns: number
  curTurn: number
  curTime: number
  curTeam: 0 | 1 // 0 for first team, 1 for second team
  isServer: boolean
  intervalId: NodeJS.Timer | null
  constructor(intervalTime: number, turnTime: number, totalTurns: number) {
    this.intervalTime = intervalTime
    this.turnTime = turnTime
    this.totalTurns = totalTurns
    this.curTurn = this.curTime = 0
    this.curTeam = 0
    this.isServer = true
    this.intervalId = null
  }

  start() {
    this.status = "running"
    this.isServer = false
    this.handleIntervalLogic = this.handleIntervalLogic.bind(this)
    this.intervalId = setInterval(this.handleIntervalLogic, 1000)
  }

  private handleIntervalLogic() {
    if (this.curTime + 1 === this.turnTime + this.intervalTime) {
      if (this.curTurn + 1 === this.totalTurns) {
        return this.stop()
      }

      this.curTurn += 1
      this.curTime = 0
      this.curTeam = this.curTeam === 1 ? 0 : 1
      this.isServer = false
      return
    }
    this.curTime += 1
    if (this.curTime === this.turnTime) {
      this.isServer = true
      processActions(
        actionRegistry.actions,
        actionRegistry.teamWithAgents
      ).then(() => {
        actionRegistry.setNull()
      })
    }
  }

  stop() {
    this.status = "stoped"
    const id: number | undefined = Number(this.intervalId) || undefined
    clearInterval(id)
    this.intervalId = null
  }

  getStatus() {
    return this.status
  }
}
