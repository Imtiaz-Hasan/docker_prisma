import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import ErrorsMid from './routers/middlewares/ErrorsMid'
import PrismaMid from './routers/middlewares/PrismaMid'
import AuthRouter from './routers/AuthRouter'
import AgentMid from './routers/middlewares/AgentMid'
import TestRouter from './routers/TestRouter'

//init
dotenv.config()
const app = express()

//middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieparser())
app.use(cors({ origin: true, credentials: true }))
app.use(AgentMid)
app.use(PrismaMid)

//routers
app.get('/', (req, res) => res.send(`Running app in ${process.env.NODE_ENV}... 🚀`))
app.use('/test', TestRouter)
app.use('/auth', AuthRouter)

// Apply error middlewares correctly
app.use(ErrorsMid[0]) // Not Found middleware
app.use(ErrorsMid[1]) // Error handling middleware

const port = process.env.PORT || 2727
app.listen(port, () => console.log(`Server Running on PORT ${port}`))