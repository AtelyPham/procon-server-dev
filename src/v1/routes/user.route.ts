import { Router } from "express"
import { body } from "express-validator"
import {
  login as loginController,
  register as registerController,
} from "../controllers/user.controller"
import { isValidUserInput, validateFunc } from "../helpers/validators"
import rootAdminValidMiddleware from "../middlewares/rootAdmin.middleware"

const router = Router()

router.use(
  validateFunc([
    body("username").custom(isValidUserInput),
    body("pw").custom(isValidUserInput),
  ])
)

router.post("/login", loginController)
router.post("/register", rootAdminValidMiddleware, registerController)

export default router
