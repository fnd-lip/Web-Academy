import express from 'express'
import getEnv from './utils/getEnv.js'
import logger from './middlewares/logger.js'
import router from './router/router.js'

const app = express()
const env = getEnv()

const PORT = env.PORT

app.use(logger('completo'))
app.use("/js", express.static(`${process.cwd()}/public/js`))
app.use("/css", express.static(`${process.cwd()}/public/css`))
app.use("/img", express.static(`${process.cwd()}/public/img`))

app.use(router)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use((req,res) => {
  res.status(404).send('Página não encontrada!😢')
})

app.listen(PORT, () => {
  console.log(`Express app iniciado no caminho http://localhost:${PORT}`)
})
