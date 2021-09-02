import { compare, hash } from "bcrypt"
import { Request, Response } from "express"
import configs from "../configs"
import { findUserByUserName } from "../configs/db"
import errorMsg from "../configs/errors"
import genResObj from "../helpers/genResObj"
import { generateToken } from "../helpers/jwtHelpers"
import UserModel from "../models/User.model"

export const login = async (req: Request, res: Response) => {
  const {
    body: { username: username, pw: password },
  } = req

  try {
    const user = await findUserByUserName(username)
    if (!user) {
      const { code, msg } = errorMsg.invalidUser
      return res.status(code).json(genResObj(msg, null))
    }

    const isValidPw = await compare(password, user!.password)
    if (!isValidPw) {
      const { code, msg } = errorMsg.invalidUser
      return res.status(code).json(genResObj(msg, null))
    }

    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        sub: user._id,
        iat: Date.now(),
        expiresIn: configs.ACCESS_TOKEN_EXPIRES_TIME_MILISECOND,
      }),
      generateToken({
        sub: user._id,
        iat: Date.now(),
        expiresIn: configs.REFRESH_TOKEN_EXPIRES_TIME_MILISECOND,
      }),
    ])

    req.session.token = refreshToken
    req.session.cookie.maxAge =
      configs.REFRESH_TOKEN_EXPIRES_TIME_MILISECOND / 1000
    res.send(
      genResObj(null, {
        msg: "Ok!",
        accessToken,
      })
    )
  } catch (error) {
    const { code, msg } = errorMsg.invalidUser
    res.status(code).json(genResObj(msg, null))
  }
}

export const register = async (req: Request, res: Response) => {
  const {
    body: { username: username, pw: password, isAdmin: isAdmin = false },
  } = req

  try {
    const isExist = await findUserByUserName(username)
    if (isExist) {
      const { code, msg } = errorMsg.userAlreadyExist
      return res.status(code).json(genResObj(msg, null))
    }

    const encryptedVal = await hash(password, configs.SALT_ROUND)
    const user = new UserModel({
      username: username,
      password: encryptedVal,
      isAdmin,
    })
    await user.save()

    res.json(
      genResObj(null, {
        msg: "Ok!",
      })
    )
  } catch (error) {
    const { code, msg } = errorMsg.serverError
    res.status(code).json(genResObj(msg, null))
  }
}
