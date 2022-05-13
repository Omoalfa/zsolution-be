import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import routes from "./routes";
import mongoose from "mongoose";
import fileUpload from 'express-fileupload';

config()

const port = process.env.PORT || 4000

const app = express()

app.use(cors())

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: './temp',
      abortOnLimit: true,
      limits: {
        fileSize: 5 * 1024 * 1024
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true)
          return
        } else {
          cb(new Error('File type is not supported', false))
          return
        }
      }
    })
  )
  

app.use('/api', routes)

app.get('/', (req, res) => res.send('Welcome onbaord'));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, "connect error: "))
db.once('open', () => {
    console.log('connected to db successfully')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
