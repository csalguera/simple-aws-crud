import { ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { bucket, s3 } from '../middleware/middleware.js'

const index = async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({ Bucket: bucket }))
    const objects = data.Contents.map(obj => obj.Key)
    res.status(200).json(objects)
  } catch (error) {
    console.log('Error listing objects from S3:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteObject = async (req, res) => {
  try {
    const key = req.params.key

    if (!key) {
      return res.status(400).json({ error: 'File does not exist' })
    }

    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
    res.status(204).end()
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export {
  index,
  deleteObject as delete,
}