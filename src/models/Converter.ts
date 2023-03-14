import mongoose from 'mongoose'
import { type DataToConvert } from '../global/types'
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

const ConvertedCurrencyModel = mongoose.model('convertedCurrency', convertedCurrency)

export default ConvertedCurrencyModel
