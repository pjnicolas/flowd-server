import express from 'express'
import Joi from 'joi'

export const validate = (schema: Joi.ObjectSchema, schemaParams?: Joi.ObjectSchema) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (schemaParams) {
      const urlValidation = schemaParams.validate(req.params)
      if (urlValidation.error) {
        res.status(401).send({
          message: urlValidation.error.details[0].message,
          type: urlValidation.error.details[0].type,
          path: urlValidation.error.details[0].path,
        })
        return
      }
    }

    let validation;
    if (req.method === 'GET') {
      validation = schema.validate(req.query)
    } else {
      validation = schema.validate(req.body)
    }

    if (validation.error) {
      res.status(401).send({
        message: validation.error.details[0].message,
        type: validation.error.details[0].type,
        path: validation.error.details[0].path,
      })
    } else {
      next()
    }
  }
}

export const sendDataOr404 = (res: express.Response, data: any) => {
  if (data === null || data === undefined) {
    throw { code: 404, message: 'Item not found' }
  } else {
    res.json(data)
  }
}

export const handleExpressErrors = (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
