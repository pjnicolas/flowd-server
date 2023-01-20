import express from 'express'
import Joi from 'joi'
import { handleExpressErrors, validate } from '../helpers'
import { prisma } from '../prisma'

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
})

const schemaParams = Joi.object({
  id: Joi.number().required(),
})

router.put('/task/:id', validate(schema, schemaParams), handleExpressErrors(async (req, res) => {
  const item = await prisma.task.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      name: req.body.name,
    },
  })
  res.json(item)
}))

export const TaskUpdateItem = router
