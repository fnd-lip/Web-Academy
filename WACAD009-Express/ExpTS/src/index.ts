import express, { Request, Response } from 'express'
import getEnv from './utils/getEnv.js'
import logger from './middlewares/logger.js'

const app = express()
const env = getEnv()

const PORT = env.PORT

app.use(logger('completo'))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!🙂')
})

app.listen(PORT, () => {
  console.log(`Express app iniciado no caminho http://localhost:${PORT}`)
})
