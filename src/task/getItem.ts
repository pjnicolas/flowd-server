import express from 'express'
import Joi from 'joi'
import { handleExpressErrors, sendDataOr404, validate } from '../helpers'
import { prisma } from '../prisma'

const router = express.Router()

const schema = Joi.object({})

const schemaParams = Joi.object({
  id: Joi.number().required(),
})

router.get('/task/:id', validate(schema, schemaParams), handleExpressErrors(async (req, res) => {
  const item = await prisma.task.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      history: true,
    },
  })

  sendDataOr404(res, item)
}))

export const TaskGetItem = router
