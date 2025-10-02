import express from 'express'
import getEnv from './utils/getEnv.js'
import logger from './middlewares/logger.js'
import router from './router/router.js'
import fileUpload from 'express-fileupload'
import { engine } from 'express-handlebars'
import helpers from './views/helpers/helpers.js'
const app = express()
const env = getEnv()

const PORT = env.PORT

app.engine(
  'handlebars',
  engine({
    helpers,
    partialsDir: `${process.cwd()}/src/views/partials`,
  }),
)
app.set('view engine', 'handlebars')
app.set('views', `${process.cwd()}/src/views`)

app.use(logger('completo'))
app.use(fileUpload())

app.use('/js', express.static(`${process.cwd()}/public/js`))
app.use('/css', express.static(`${process.cwd()}/public/css`))
app.use('/img', express.static(`${process.cwd()}/public/img`))

app.use(router)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use((req, res) => {
  res.status(404).send('Página não encontrada!😢')
})

app.listen(PORT, () => {
  console.log(`Express app iniciado no caminho http://localhost:${PORT}`)
})
