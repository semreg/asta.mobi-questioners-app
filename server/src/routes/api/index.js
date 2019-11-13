import { Router } from 'express'
import questioners from './questioners'
import answerlists from './answerLists'

const router = Router()

router.use('/questioners', questioners)
router.use('/answerLists', answerlists)

export default router
