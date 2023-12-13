// npm modules
import { Router } from 'express'

// controllers
import * as bucketCtrl from '../controllers/bucket.js'

// middleware
import { uploadFile } from '../middleware/middleware.js'

const router = Router()

// routes
router.post('/', uploadFile)
router.get('/', bucketCtrl.index)
router.delete('/:key', bucketCtrl.delete)

export { router }