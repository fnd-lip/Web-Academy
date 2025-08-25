import express from 'express'
import dotenv from 'dotenv'

dotenv.config({quiet: true})

const app = express()
const PORT = process.env.PORT ?? 6677

app.get('/', (req, res) => {
  res.send('Hello World!🙂')
})

app.listen(PORT, () => {
  console.log(`Express app iniciado no caminho http://localhost:${PORT}`)
})