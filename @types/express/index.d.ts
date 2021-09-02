import { JwtPayload } from "jsonwebtoken"
import Match from "../../src/types/classes/Match"
import TeamWithAgents from "../../src/types/classes/TeamWithAgents"

declare global {
  namespace Express {
    interface Request {
      jwt?: JwtPayload | string
      proconData?: {
        match?: Match
        teamWithAgents?: TeamWithAgents
      }
    }
  }
}

declare module "express-session" {
  interface SessionData {
    token?: string
  }
}

declare module "*.json" {
  const value: any
  export default value
}
