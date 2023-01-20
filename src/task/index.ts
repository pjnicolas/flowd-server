import express from 'express'
import { TaskCreateItem } from './createItem'
import { TaskGetItem } from './getItem'
import { TaskGetList } from './getList'
import { TaskStartItem } from './startItem'
import { TaskStopItem } from './stopItem'
import { TaskUpdateItem } from './updateItem'

const router = express.Router()

router.use(TaskGetItem)
router.use(TaskGetList)
router.use(TaskCreateItem)
router.use(TaskUpdateItem)
router.use(TaskStartItem)
router.use(TaskStopItem)

export const TaskRouter = router
