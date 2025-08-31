import { Request, Response, NextFunction } from 'express'
import fsPromise from 'fs/promises'
import validateEnv from '../utils/getEnv'
import { LogTipos } from './loggerTypes.js'


function logger(tipo: LogTipos) {
  const env = validateEnv()
  if (tipo === 'completo') {
    return async (req: Request, res: Response, next: NextFunction) => {
      const file = `${process.cwd()}/${env.LOGGER_DIR}/logs.log`
      await fsPromise.mkdir(`${process.cwd()}/${env.LOGGER_DIR}`, { recursive: true })
      const log = `${new Date().toISOString()} ${req.method} ${req.url} HTTP/${req.httpVersion} ${req.get('User-Agent')}\n`
      await fsPromise.appendFile(file, log)
      next()
    }
  } else {
    return async (req: Request, res: Response, next: NextFunction) => {
      const file = `${process.cwd()}/${env.LOGGER_DIR}/logs.log`
      await fsPromise.mkdir(`${process.cwd()}/${env.LOGGER_DIR}`, { recursive: true })
      const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`
      await fsPromise.appendFile(file, log)
      next()
    }
  }
}

export default logger
