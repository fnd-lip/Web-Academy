import express from 'express'
import fileUpload from 'express-fileupload'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { v4 as uuidv4 } from 'uuid'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

import getEnv from './utils/getEnv'
import logger from './middlewares/logger'
import setTheme from './middlewares/setTheme'
import setLocals from './middlewares/setLocals'
import setGuestPurchaseId from './middlewares/setGuestPurchaseId'
import router from './router/router.js'
import helpers from './views/helpers/helpers'
import { PrismaClient } from './generated/prisma'

declare module 'express-session' {
  interface SessionData {
    guestPurchaseId: string
    isAuth: boolean
    userId: string
    isAdmin: boolean
  }
}

const app = express()
const env = getEnv()
const prisma = new PrismaClient()

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
app.use(cookieParser())
app.use(setTheme)
app.use(
  session({
    genid: () => uuidv4(),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 60 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    })
  })
)
app.use(setLocals)
app.use(setGuestPurchaseId)

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
