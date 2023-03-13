import { type Request, type Response } from 'express'
import { convertCurrency, getAllCurrencySymbolsAndNames, getAllConvertedResults } from '../services/CurrencyService'

const getAllCurrencySymbolsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const currencies = getAllCurrencySymbolsAndNames()
    res.json({ data: currencies, status: 'success' })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const convertCurrencyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, from, to } = await req.body
    const convertInput = await convertCurrency(amount, from, to)
    res.json({ data: convertInput, status: 'success' })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const getAllConvertedValuesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const allConvertedValues = await getAllConvertedResults()
    res.json({ data: allConvertedValues, status: 'success' })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllCurrencySymbolsController, convertCurrencyController, getAllConvertedValuesController }
