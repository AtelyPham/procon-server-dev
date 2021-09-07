import { Router, Request, Response } from "express"
import matchRoute from "./match.route"
import userRoute from "./user.route"
import { setup, serve } from "swagger-ui-express"
import SwaggerDocs from "../../../AtelyPham-Procon-Admin-API-1.0.0-resolved.json"
import genResObj from "../helpers/genResObj"

const router = Router()

router.get("/v1", (req: Request, res: Response) => {
  res.send(
    genResObj(null, {
      version: "1",
      author: "Trung-Tin Pham",
      description: "API for Procon Server App",
    })
  )
})

router.use("/v1/matches", matchRoute)
router.use("/v1/users", userRoute)

router.use("/v1/docs", serve)
router.get("/v1/docs", setup(SwaggerDocs))

export default router
