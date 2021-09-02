import assert from "assert"
import { nanoid } from "nanoid"
import config from "../../configs"
import MatchOpts from "../interfaces/MatchOpts"
import MainBoard from "./MainBoard"
import MatchList from "./MatchList"
import TeamWithAgentFactory from "./TeamWithAgentsFactory"
import TileBoard from "./TileBoard"
import Timer from "./Timer"

const defaultMatchOpts: MatchOpts = {
  size: 8,
  turnTime: 10,
  totalTurns: 5,
  minPoint: -3,
  maxPoint: 10,
}

const defaultIntervalTime = 5

export default class Match {
  matchId: string
  timer: Timer
  board: MainBoard
  tiles: TileBoard
  teamIds: string[] = []

  constructor(option: MatchOpts = defaultMatchOpts) {
    this.matchId = nanoid(config.ID_LENGTH)

    const {
      turnTime = defaultMatchOpts.turnTime,
      totalTurns = defaultMatchOpts.totalTurns,
      size = defaultMatchOpts.size,
      minPoint = defaultMatchOpts.minPoint,
      maxPoint = defaultMatchOpts.maxPoint,
    } = option

    this.timer = this.buildTimer(
      defaultIntervalTime,
      Number(turnTime),
      Number(totalTurns)
    )

    const [team0, team1] = this.buildTeams(size)
    team0.team.setMatchId(this.matchId)
    team1.team.setMatchId(this.matchId)

    this.teamIds.push(team0.team.teamId)
    this.teamIds.push(team1.team.teamId)

    this.board = this.buildBoard(size, minPoint, maxPoint)
    this.tiles = this.buildTiles(size)

    MatchList.addMatch(this)
  }

  private buildTeams(size: number = 8) {
    const agentListSize = this.numOfAgents(size)
    const factory = new TeamWithAgentFactory()
    return factory.createInstances(agentListSize, size)
  }

  private buildTiles(size: number) {
    return new TileBoard(size)
  }

  private buildBoard(size: number, minPoint: number, maxPoint: number) {
    return new MainBoard(size, minPoint, maxPoint)
  }

  private buildTimer(
    intervalTime: number,
    turnTime: number,
    totalTurns: number
  ) {
    assert(intervalTime > 0)
    assert(turnTime > 0)
    assert(totalTurns > 0)
    return new Timer(intervalTime, turnTime, totalTurns)
  }

  private numOfAgents(size: number): number {
    switch (size) {
      case 8:
        return 3
      case 10:
        return 5
      case 12:
        return 7
      default:
        return 3
    }
  }

  startMatch(): boolean {
    if (this.timer.getStatus() === "running") {
      return false
    }
    this.timer.start()
    return true
  }

  stopMatch() {
    this.timer.stop()
  }
}
