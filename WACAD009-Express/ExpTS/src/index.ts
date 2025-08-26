import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import validateEnv from './utils/validateEnv.js'

const app = express()
dotenv.config({ quiet: true })
const env = validateEnv()

console.log(env.NODE_ENV)
console.log(typeof process.env.PORT)
console.log(typeof env.PORT)

const PORT = env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!🙂')
})

app.listen(PORT, () => {
  console.log(`Express app iniciado no caminho http://localhost:${PORT}`)
})
