import { Request, Response } from 'express'
import { compareSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../../models/user'

class UuserLogin {
  static async post(req: Request, res: Response) {
    const { password, email } = req.body

    if (!email) {
      res.status(422).json({ message: "Email é obrigatório!" });
      return
    }
    if (!password) {
      res.status(422).json({ message: "Senha é obrigatório!" });
      return
    }

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(422).json({ message: "Email não cadastrado." });
        }

        const passwordValid = compareSync(password, user.password);

        if (!passwordValid) {
          return res.status(422).json({ message: "Senha incorreta." });
        }

        const token = jwt.sign({
          name: user.name,
          id: user.id
        }, process.env.JWT!)

        return res.status(200).json({
          token: token,
          name: user.name,
          email: user.email,
          tell: user.tell
        })
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  }
}

export default UuserLogin