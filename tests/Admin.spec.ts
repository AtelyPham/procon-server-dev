import Admin from "../src/v1/types/classes/Admin"
import { expect } from "chai"

describe("Test for Admin class", () => {
  it("Check when initialize object", () => {
    const admin = new Admin()
    expect(admin).to.have.all.keys("_permission")

    expect(admin.permission).to.equals("*")
  })

  it("Check when initialize object with permission", () => {
    const admin = new Admin("create-match")
    expect(admin).to.have.all.keys("_permission")
    expect(admin.permission).to.equal("create-match")
  })
})
