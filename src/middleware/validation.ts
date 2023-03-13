import { type Request, type Response, type NextFunction } from 'express'

export const requireJsonContent = (request: Request, response: Response, next: NextFunction): void => {
  if (request.headers['content-type'] !== 'application/json') {
    response.status(400).send('Server requires application/json')
  } else {
    next()
  }
}

// add express validator functions for user inputs here
