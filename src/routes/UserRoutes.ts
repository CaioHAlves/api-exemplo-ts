import { Router } from 'express'

import UserCreate from '../controllers/user/create'
import UserLogin from '../controllers/user/login'

const router = Router()

router.post("/create", UserCreate.create)
router.post("/login", UserLogin.post)

export default router