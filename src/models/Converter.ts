import mongoose from 'mongoose'
const Schema = mongoose.Schema

const convertedCurrency = new Schema<DataToConvert>({
  originalAmount: String,
  destAmount: String,
  from: String,
  to: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export interface DataToConvert {
  originalAmount: string
  destAmount: string
  rate?: string
  from: string
  to: string
  createdAt: {
    type: Date
    default: Date
  }
}

const ConvertedCurrencyModel = mongoose.model('convertedCurrency', convertedCurrency)

export default ConvertedCurrencyModel
