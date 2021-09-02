import Team from "./Team"

export default class Admin {
  private _permission: string
  constructor(permission: string = "*") {
    this._permission = permission
  }

  public get permission() {
    return this._permission
  }
}
