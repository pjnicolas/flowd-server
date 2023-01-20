import express from 'express'
import helmet from 'helmet'
import { API_PORT, API_WHITELIST } from './env'
import { TaskRouter } from './task'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use((req, res, next) => {
  const origin = req.get('origin') || '';
  if (API_WHITELIST.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  next()
})

app.use(TaskRouter)

const ERROR_CODES: { [key: number]: Array<string | number> } = {
  404: ['404', 404, 'P2025'],
  409: ['409', 409],
}

const translateErrorCodeToStatus = (code: string) => {
  const status = Object.keys(ERROR_CODES).find((key: any) => ERROR_CODES[key].includes(code));
  return status ? Number(status) : 500;
}

app.use((error: any, req: any, res: any, next: any) => {
  res.status(translateErrorCodeToStatus(error.code)).json({
    name: error.name,
    code: error.code,
    message: error.message,
  })
});

export const start = () => {
  app.listen(API_PORT, () => {
    console.log(`Listening on port [${API_PORT}]`);
  })
}
