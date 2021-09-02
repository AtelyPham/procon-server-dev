import jwt from "jsonwebtoken"
import config from "../configs"

type JwtPayload = {
  teamId?: string
  data?: string
  iat?: number
  sub?: string
  expiresIn?: number
}

export const generateToken = async (payload: JwtPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, config.SECRET, (error, token) => {
      if (error) {
        reject(error)
      }
      resolve(token!)
    })
  })
}

export const validateToken = async (token: string) => {
  try {
    const payload = jwt.verify(token, config.SECRET)
    return Promise.resolve(payload)
  } catch (error) {
    return Promise.reject(error)
  }
}
