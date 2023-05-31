import { Router } from 'express'

import { UserMeasurementsCreate } from '../controllers/userMeasurements/create'
import { UserMeasurementsGet } from '../controllers/userMeasurements/get'
import { UserMeasurementsPatch } from '../controllers/userMeasurements/patch'
import { configHeaders } from '../middlewares/configHeaders'

const router = Router()

router.post("/create", configHeaders, UserMeasurementsCreate.post)
router.get("/get/:userId", configHeaders, UserMeasurementsGet.getForUser)
router.patch("/update/:measurementsId", configHeaders, UserMeasurementsPatch.patch)

export default router