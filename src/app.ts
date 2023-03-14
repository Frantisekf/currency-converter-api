import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import currencyRouter from './routes/CurrencyRouter'
import { limiter } from './middleware/rateLimit'
dotenv.config()

const DB_PASSWORD = process.env.DB_PASSWORD

const uri = `mongodb+srv://frantisekf:${DB_PASSWORD}@cluster0.zrvplni.mongodb.net/?retryWrites=true&w=majority`

const app = express()

try {
  void mongoose.connect(uri)
  console.log('Connected to MongoDB Atlas')
} catch (err: any) {
  console.log(err)
  throw new Error(err.message)
}

app.use(cors())
app.use(express.json())
app.use(limiter)
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api', currencyRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`)
})

export default app
