import { cleanEnv, port, str, num } from 'envalid'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

function getEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 80 }),
    SESSION_SECRET: str({ default: 'secret1' }),
    NODE_ENV: str({
      choices: ['development', 'production'],
      default: 'development',
    }),
    LOGGER_DIR: str({ default: 'logs' }),
    BCRYPT_ROUNDS: num(),
    PASSWORD_ADMIN: str(),
  })
}

export default getEnv
