import { Router } from 'express'

import { UserMeasurementsCreate } from '../controllers/userMeasurements/create'
import { UserMeasurementsGet } from '../controllers/userMeasurements/get'
import { UserMeasurementsPatch } from '../controllers/userMeasurements/patch'

const router = Router()

router.post("/create", UserMeasurementsCreate.post)
router.get("/get/:userId", UserMeasurementsGet.getForUser)
router.patch("/update/:measurementsId", UserMeasurementsPatch.patch)

export default router