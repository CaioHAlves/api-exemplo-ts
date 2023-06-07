import { NextFunction, Request, Response } from "express"

export const configHeaders = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.hostname)
  const whitelist: Array<string | undefined> = [
    "https://app-mhd.pages.dev",
    "https://app-mhd.vercel.app"
  ]
  if (process.env.AMBIENT === "production") {

    if (whitelist.indexOf(req.hostname) !== -1) {
      res.setHeader("Access-Control-Allow-Origin", req.hostname)
    }
    // res.setHeader("Access-Control-Allow-Origin", "https://app-mhd.pages.dev")
  }

  next()
}