import { Router } from 'express'

import { UserCreate } from '../controllers/user/create'
import { UserGetAll } from '../controllers/user/getAllUsers'
import { UserLogin } from '../controllers/user/login'

const router = Router()

router.post("/create", UserCreate.create)
router.post("/login", UserLogin.post)
router.get("/getAll", UserGetAll.getAllUsers)

export default router