import { Router } from 'express'
import api from './api'
import path from 'path'

const router = Router()

router.use('/api', api)

router.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../../client/build/index.html'))
})

export default router
