import { Router } from "express"
import matchRoute from "./match.route"
import userRoute from "./user.route"
import { setup, serve } from "swagger-ui-express"
import SwaggerDocs from "../../../AtelyPham-Procon-Admin-API-1.0.0-resolved.json"

const router = Router()

router.use("/v1/matches", matchRoute)
router.use("/v1/users", userRoute)
router.use("/v1/api-docs", serve)
router.get("/v1/api-docs", setup(SwaggerDocs))

export default router
