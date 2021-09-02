import Admin from "./Admin"
import Team from "./Team"

export default class TeamFactory {
  createTeams() {
    const team0 = new Team(new Admin())
    const team1 = new Team()

    return [team0, team1]
  }
}
