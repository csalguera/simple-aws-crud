import 'dotenv/config.js'
import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'

const app = express()
const portNum = 3001

app.listen(portNum, () => {
  console.log(`Now listening on port ${portNum}`);
})