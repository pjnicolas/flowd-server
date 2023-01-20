import express from 'express'
import Joi from 'joi'
import { handleExpressErrors, validate } from '../helpers'
import { prisma } from '../prisma'

const router = express.Router()

const schema = Joi.object({})

router.get('/task', validate(schema), handleExpressErrors(async (req, res) => {
  const list = await prisma.task.findMany({
    include: {
      history: true,
    },
  })

  res.json(list)
}))

export const TaskGetList = router;
