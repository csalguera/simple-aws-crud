import { Router } from 'express'
import * as bucketCtrl from '../controllers/bucket.js'

const router = Router()

router.post('/', bucketCtrl.upload)
router.get('/', bucketCtrl.index)
router.put('/', bucketCtrl.update)
router.delete('/', bucketCtrl.delete)

export { router }