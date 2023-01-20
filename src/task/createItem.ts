import express from 'express'
import Joi from 'joi'
import { handleExpressErrors, validate } from '../helpers'
import { prisma } from '../prisma'

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().required(),
})

router.post('/task', validate(schema), handleExpressErrors(async (req, res) => {
  const item = await prisma.task.create({
    data: {
      name: req.body.name,
    },
  })
  res.json(item)
}))

export const TaskCreateItem = router
