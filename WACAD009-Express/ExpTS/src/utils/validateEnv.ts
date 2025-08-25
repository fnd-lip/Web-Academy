import { cleanEnv, port, str } from 'envalid'

function validateEnv() {
  return cleanEnv(process.env, {
    PORT: port({ default: 80 }),
    NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
  })
}

export default validateEnv