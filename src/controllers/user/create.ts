import { Request, Response } from 'express'
import { genSaltSync, hashSync } from "bcrypt"
import jwt from 'jsonwebtoken'
import User from '../../models/user'

const salt = genSaltSync(12);

class UserCreate {
  static async create(req: Request, res: Response) {
    const { name, password, email, tell } = req.body

    
    if (!name) {
      res.status(422).json({ message: "Nome é obrigatório!" })
      return
    }
    if (!email) {
      res.status(422).json({ message: "Email é obrigatório!" });
      return
    }
    if (!password) {
      res.status(422).json({ message: "Senha é obrigatório!" });
      return
    }

    
    User.findOne({ email: email })
    .then((existsUser) => {
      if (existsUser) {
        res.status(422).json({ message: "Email já cadastrado" });
        return;
      }
      
      const passwordHash = hashSync(password, salt)
      User.create({
        name,
        email,
        tell,
        password: passwordHash
      })
        .then((newUser) => {
          const token = jwt.sign({
            name,
            id: newUser._id
          }, process.env.JWT!)

          return res.status(200).json({
            token,
            name, 
            email,
            message: "Usuário criado com sucesso"
          })
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Erro ao gerar cadastro!",
            error
          })
        })
      })
  }
}

export default UserCreate