import { Router } from 'express'

import { ChargeCreate } from '../controllers/charge/create'
import { ChargeGet } from '../controllers/charge/get'
import { ChargeUpdate } from '../controllers/charge/patch'
import { configHeaders } from '../middlewares/configHeaders'

const router = Router()

router.post("/create", configHeaders, ChargeCreate.create)
router.get("/get/:userId", configHeaders, ChargeGet.getForUser)
router.patch("/patch/:id", configHeaders, ChargeUpdate.update)

export default router