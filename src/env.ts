import 'dotenv/config'

const getEnv = (name: string) => {
  const env = process.env[name]
  if (env === undefined || env === null || env === '') {
    throw new Error(`Enviroment variable [${name}] not found`)
  }

  return env
}

export const API_PORT = getEnv('API_PORT')
