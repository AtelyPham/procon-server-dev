import { NextFunction, Request, Response } from "express"
import { Meta, ValidationChain, validationResult } from "express-validator"
import { Action } from "../types/interfaces/Actions"

export const validateFunc = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ success: false, errors: errors.array() })
  }
}

export const isValidSize = (size: number, meta: Meta) => {
  const values = [8, 10, 12]
  const turnTimes = [10, 15, 20]
  const totalTurns = [5, 7, 10]

  if (!values.includes(size)) {
    return Promise.reject("Size must be 8 or 10 or 12!")
  }

  const body = meta.req.body
  const idx = values.indexOf(size)
  const check = Boolean(
    body["turnTime"] === turnTimes[idx] &&
      body["totalTurns"] === totalTurns[idx]
  )

  if (!check) {
    return Promise.reject(
      `Turn time must be ${turnTimes[idx]} and total turns must be ${totalTurns[idx]} for size ${size}`
    )
  }

  return Promise.resolve("OK!")
}

export const isValidActions = async (actions: any, meta: Meta) => {
  const errMsg =
    "actions field in the body must be array and should not be empty!"
  if (!actions || !Array.isArray(actions)) {
    return Promise.reject(errMsg)
  }

  try {
    await Promise.all(actions.map(act => isValidAction(act)))
    return Promise.resolve("Ok!")
  } catch (error) {
    return Promise.reject(error)
  }
}

const isValidAction = async (action: any | Action) => {
  const errorMsg = "action object is incorrect!"
  if (!action) {
    return new Promise((res, rej) => rej(errorMsg))
  }

  try {
    await Promise.all([
      isValidDxy(action.dx),
      isValidDxy(action.dy),
      isValidType(action.type),
    ])
    return new Promise(res => res("Ok!"))
  } catch (err) {
    return new Promise((res, rej) => rej(err))
  }
}

const isValidDxy = async (dxy: any | number) => {
  if (![-1, 0, 1].includes(Number.parseInt(dxy))) {
    return new Promise((res, rej) => rej("dx or dy value is invalid!"))
  }
  return new Promise(res => res("Ok!"))
}

const isValidType = async (type: any | string) => {
  if (!["move", "remove", "stay"].includes(type)) {
    return new Promise((res, rej) => rej("type value is invalid!"))
  }
  return new Promise(res => res("Ok!"))
}

export const isValidUserInput = (text: string) => {
  const re = /^\w{4,15}$/g
  return new Promise((res, rej) =>
    re.test(text)
      ? res("Ok!")
      : rej(
          "Username and password must contain between 4 and 15 alphanumeric or underscore character."
        )
  )
}

export const isBetween = (minVal: number, maxVal: number) => (val?: number) => {
  if (!val) {
    return Promise.resolve("Ok!")
  }
  return Boolean(minVal <= val && val <= maxVal)
    ? Promise.resolve("Ok!")
    : Promise.reject(`Must between ${minVal} and ${maxVal} inclusive!`)
}
