import { Router } from 'express'

import { UserCreate } from '../controllers/user/create'
import { UserDelete } from '../controllers/user/delete'
import { UserGetAll } from '../controllers/user/getAllUsers'
import { UserLogin } from '../controllers/user/login'
import { UserUpdate } from '../controllers/user/update'
import { configHeaders } from '../middlewares/configHeaders'

const router = Router()

router.post("/create", configHeaders, UserCreate.create)
router.post("/login", configHeaders, UserLogin.post)
router.get("/getAll", configHeaders, UserGetAll.getAllUsers)
router.patch("/update/:userId", configHeaders, UserUpdate.update)
router.delete("/delete/:userId", configHeaders, UserDelete.delete)
router.patch("/reset-password", configHeaders, UserUpdate.resetPassword)

export default router