import { NextFunction, Request, Response } from "express"

export const configHeaders = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.AMBIENT === "production") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
  }

  next()
}