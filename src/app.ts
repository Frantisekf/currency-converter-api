import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import currencyRouter from './routes/CurrencyRouter'

const DB_PASSWORD = 'cM422lyOiO3CJzv3'

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
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api', currencyRouter)

app.listen(3001, () => {
  console.log('server running on port 3001')
})

export default app
