// npm modules
import 'dotenv/config.js'
import express from 'express'

// routers
import { router as bucketRouter } from './routes/bucket.js'

const app = express()
const portNum = process.env.PORT || 3000

// middleware
app.use(express.json())

// mount routes
app.use('/', bucketRouter)

app.listen(portNum, () => {
  console.log(`Now listening on port ${portNum}`);
})