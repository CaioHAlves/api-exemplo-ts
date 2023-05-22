import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerConfig } from './swagger/swaggerConfig'

import UserRoutes from './routes/UserRoutes'
import UserMeasurements from './routes/UserMeasurements'

const whitelist: Array<string | undefined> = [
  "http://localhost:3000"
]

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors({
  origin: process.env.AMBIENT !== "production" ? "*" : (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  credentials: true
}))

app.use("/users", UserRoutes)
app.use("/measurements", UserMeasurements)

// Block swagger in production 
if (process.env.AMBIENT !== "production") {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
}

app.listen(port, () => {
  if (process.env.AMBIENT !== "production") {
    console.log(`Server started on port ${port}`);
  }
});