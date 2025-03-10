import { Request, Response } from 'express'
import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import { User } from '../../models/user'

export class UserLogin {
  static async post(req: Request, res: Response) {
    const { password, email } = req.body

    if (!email) {
      res.status(422).json({ message: "Email é obrigatório!", field: "email" });
      return
    }
    if (!password) {
      res.status(422).json({ message: "Senha é obrigatório!", field: "password" });
      return
    }

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(422).json({ message: "Email não cadastrado.", field: "email" });
        }

        const passwordValid = compareSync(password, user.password);

        if (!passwordValid) {
          return res.status(422).json({ message: "Senha incorreta.", field: "password" });
        }

        const token = jwt.sign({
          name: user.name,
          id: user.id
        }, process.env.JWT!)

        return res.status(200).json({
          token: token,
          name: user.name,
          email: user.email,
          tell: user.tell,
          isAStudent: user.isAStudent
        })
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  }
}