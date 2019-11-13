import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import path from 'path'
import routes from './routes'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '../../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

export default app
