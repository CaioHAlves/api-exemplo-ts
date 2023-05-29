import { Router } from 'express'

import { ChargeCreate } from '../controllers/charge/create'
import { ChargeGet } from '../controllers/charge/get'
import { ChargeUpdate } from '../controllers/charge/patch'

const router = Router()

router.post("/create", ChargeCreate.create)
router.get("/get/:userId", ChargeGet.getForUser)
router.patch("/patch/:id", ChargeUpdate.update)

export default router