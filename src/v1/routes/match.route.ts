import { Router } from "express"
import { body } from "express-validator"
import matchController from "../controllers/match.controller"
import validAdminTokenMiddleware from "../middlewares/validateAdminToken.middleware"
import validPlayerTokenMiddleware from "../middlewares/validatePlayerToken.middleware"
import validTurnMiddleware from "../middlewares/validTurn.middleware"
import checkTokensMiddleware from "../middlewares/checkTokens.middleware"
import {
  isValidActions,
  isValidSize,
  validateFunc,
  isBetween,
} from "./../helpers/validators"

const router = Router()

// Common session
router.get("/", checkTokensMiddleware, matchController.getMatches)
router.get("/:id", checkTokensMiddleware, matchController.getMatch)

// Admin session
router.use(["/create", "/start", "/stop"], validAdminTokenMiddleware)
router.delete("/:id", validAdminTokenMiddleware, matchController.deleteMatch)
router.post(
  "/create",
  validateFunc([
    body("size").custom(isValidSize),
    body("minPoint").custom(isBetween(-5, 3)),
    body("maxPoint").custom(isBetween(5, 15)),
  ]),
  matchController.postCreateMatch
)
router.post("/start", matchController.postStartMatch)
router.post("/stop", matchController.postStopMatch)

// Player session
router.post(
  "/:id",
  validPlayerTokenMiddleware,
  validTurnMiddleware,
  validateFunc([body("actions").custom(isValidActions)]),
  matchController.postActionMatch
)

export default router
