const express = require('express')
const dotenv = require('dotenv')

const app = express()
dotenv.config()

const PORT = process.env.PORT ?? 6677

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})