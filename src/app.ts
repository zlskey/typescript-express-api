import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

import './db/connectDb'
import router from './routers'
import { errorMiddleware } from './middlewares'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(router)
app.use(errorMiddleware.notFound)
app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log('Listening on: http://localhost:%d', PORT))
