import 'dotenv/config.js'
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer'
import multerS3 from 'multer-s3'

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}

const bucket = process.env.AWS_BUCKET
const s3 = new S3({
  credentials,
  region: process.env.AWS_REGION,
})

const upload = multer({
  storage: multerS3({
    bucket,
    s3,
    key: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})

const uploadFile = (req, res, next) => {
  try {
    upload.single('file')(req, res, next)
    res.status(201).json({ msg: 'File successfully uploaded' })
  } catch (error) {
    console.log(error);
    res.status({ error: 'Internal Server Error' })
  }
}

export {
  uploadFile,
  bucket,
  s3,
}