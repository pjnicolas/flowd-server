import 'dotenv/config'

const getEnvString = (name: string) => {
  const env = process.env[name]
  if (env === undefined || env === null || env === '') {
    throw new Error(`Enviroment variable [${name}] not found`)
  }

  return env
}

const getEnvNumber = (name: string) => {
  const env = getEnvString(name)
  const number = Number(env)
  if (Number.isNaN(number)) {
    throw new Error(`Enviroment variable [${name}] is not a number`)
  }
  return number
}

const getEnvArray = (name: string) => {
  const env = getEnvString(name)
  return env.split(',')
}

export const API_PORT = getEnvNumber('API_PORT')
export const API_WHITELIST = getEnvArray('API_WHITELIST')
