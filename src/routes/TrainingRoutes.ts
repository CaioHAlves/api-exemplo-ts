import { Router } from 'express'
import { configHeaders } from '../middlewares/configHeaders'

import { TrainingCreate } from '../controllers/training/create'
import { TrainingUpdate } from '../controllers/training/update'
import { TrainingGet } from '../controllers/training/get'

const router = Router()

router.post("/create", configHeaders, TrainingCreate.create)
router.patch("/patch/:id", configHeaders, TrainingUpdate.update)
router.get("/get", configHeaders, TrainingGet.get)

export default router