import Dinero from 'dinero.js'
import fetch from 'node-fetch'

const FIXER_API_KEY = 'zID0JkMYYRXMz8HLVVgKn9gJvyjwBcqR'

interface RatesResponseData {
  success: boolean
  timestamp: number
  base: string
  rates: Record<string, number>
}

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

export const convert = async (amount: number, from: string, to: string): Promise<Dinero> => {
  const options = {
    headers: {
      apikey: FIXER_API_KEY
    }
  }
  try {
    const getRates = await fetch(`https://api.apilayer.com/fixer/latest?base=${from}&symbols=${to}`, options)
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
