import { cleanEnv, port, str } from 'envalid'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 80 }),
    NODE_ENV: str({
      choices: ['development', 'production'],
      default: 'development',
    }),
    LOGGER_DIR: str({ default: 'logs' }),
  })
}

export default getEnv
