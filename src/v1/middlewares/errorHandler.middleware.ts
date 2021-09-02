import { Response, Request, NextFunction } from "express"
import ResponseType from "../types/ResponseType"

export const errorHandlerMiddleware = function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let resObj: ResponseType = {
    success: false,
    error: {
      ...error,
    },
  }

  res.statusCode = 500

  if (error.message === `Not resource for ${req.path}`) {
    res.statusCode = 404
  }

  res.json(resObj)
}

export const notFoundMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error = new Error(`Not resource for ${req.path}`)
  error.name = `Not Found Resource for ${req.path}`
  next(error)
}
