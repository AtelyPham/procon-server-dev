import MatchList from "./MatchList"

export default class MatchCleaner {
  ids: string[] = []
  intervalVal: number | undefined = 60000

  private constructor() {
    setInterval(() => {
      this.clean()
    }, this.intervalVal)
  }

  static init() {
    return new MatchCleaner()
  }

  async clean() {
    const list = Object.values(MatchList.entities)

    this.ids.forEach(id => {
      const match = MatchList.entities[id]

      if (match) {
        if (match.timer.getStatus() !== "running") {
          MatchList.removeMatchById(id)
        }
      }
    })

    this.ids = []

    list.forEach(match => {
      if (match.timer.getStatus() !== "running") {
        this.ids.push(match.matchId)
      }
    })
  }
}
