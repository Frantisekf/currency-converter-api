import Dinero from 'dinero.js'
import fetch from 'node-fetch'
import { type RatesResponseData } from '../global/types'
import { type MoneyType } from 'src/global/types'
import * as dotenv from 'dotenv'

dotenv.config()

const FIXER_API_KEY = String(process.env.FIXER_API_KEY)

// type guard function for the rates fetch call
const isRatesResponseData = (data: unknown): data is RatesResponseData => {
  const ratesData = data as RatesResponseData
  return (
    ratesData.success !== undefined &&
    ratesData.timestamp !== undefined &&
    ratesData.base !== undefined &&
    ratesData.rates !== undefined
  )
}

export const convert = async (Money: MoneyType): Promise<Dinero> => {
  const { amount, from, to } = Money
  const options = {
    headers: {
      apikey: FIXER_API_KEY
    }
  }
  try {
    // rates API result should be cached and should not run on every request (e.g. but only once per day)
    // this may result in inaccurate values as rates are constantly moving
    console.log(FIXER_API_KEY)
    const getRates = await fetch(`${process.env.FIXER_BASE_URL}/latest?base=${from}&symbols=${to}`, options)
    const ratesData = await getRates.json()
    if (!isRatesResponseData(ratesData)) {
      throw new Error('Failed to get conversion rate.')
    }

    // const price = await Dinero({ amount, precision: 2 }).convert(to, {
    //   endpoint: new Promise((resolve) => {
    //     resolve(ratesData)
    //   })
    // })

    return Dinero({ amount, precision: 2, scale: 2 }).convert(to, {
      endpoint: new Promise((resolve) => {
        resolve(ratesData)
      })
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to convert.')
  }
}
