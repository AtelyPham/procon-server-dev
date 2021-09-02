import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import v1Route from "./v1/routes"
import db from "./v1/configs/db"
import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from "./v1/middlewares/errorHandler.middleware"
import MatchCleaner from "./v1/types/classes/MatchCleaner"
import session from "express-session"
import config from "./v1/configs"

MatchCleaner.init()
const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: config.SECRET,
    saveUninitialized: false,
    resave: false,
  })
)

app.use("/api", v1Route)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

db.init(() => {
  const PORT = process.env.PORT || 2303
  app.listen(PORT, () => console.log(`Listing on port ${PORT}`))
})
