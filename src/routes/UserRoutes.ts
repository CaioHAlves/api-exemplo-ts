import { Router } from 'express'

import { UserCreate } from '../controllers/user/create'
import { UserDelete } from '../controllers/user/delete'
import { UserGetAll } from '../controllers/user/getAllUsers'
import { UserLogin } from '../controllers/user/login'
import { UserUpdate } from '../controllers/user/update'

const router = Router()

router.post("/create", UserCreate.create)
router.post("/login", UserLogin.post)
router.get("/getAll", UserGetAll.getAllUsers)
router.patch("/update/:userId", UserUpdate.update)
router.delete("/delete/:userId", UserDelete.delete)
router.patch("/reset-password", UserUpdate.resetPassword)

export default router