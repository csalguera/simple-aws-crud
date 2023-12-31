import { ListObjectsV2Command, HeadObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
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

    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    } catch (error) {
      if (error.name === 'NotFound') {
        return res.status(404).json({ error: 'File not found' })
      }
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