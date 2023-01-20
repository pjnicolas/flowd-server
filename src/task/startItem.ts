import express from 'express'
import Joi from 'joi'
import { handleExpressErrors, sendDataOr404, validate } from '../helpers'
import { prisma } from '../prisma'

const router = express.Router()

const schema = Joi.object({})

const schemaParams = Joi.object({
  id: Joi.number().required(),
})

router.patch('/task/:id/start', validate(schema, schemaParams), handleExpressErrors(async (req, res) => {
  const item = await prisma.task.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!item) {
    throw { code: 404, message: 'Task not found' }
  } else if (item.start) {
    throw { code: 409, message: 'Task already started' }
  }

  const updatedItem = await prisma.task.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      start: new Date(),
    },
  })

  sendDataOr404(res, updatedItem)
}))

export const TaskStartItem = router
