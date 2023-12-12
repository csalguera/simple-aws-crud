import 'dotenv/config.js'
import express from 'express'

import { router as bucketRouter } from './routes/bucket.js'

const app = express()
const portNum = 3001

app.use(express.json())

app.use('/', bucketRouter)

app.listen(portNum, () => {
  console.log(`Now listening on port ${portNum}`);
})