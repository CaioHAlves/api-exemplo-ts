import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../../models/user'

const salt = genSaltSync(12);

export class UserUpdate {
  static update(req: Request, res: Response) {
    const { userId } = req.params
    const { name, password, email, tell, newPassword } = req.body

    const newPasswordHash = () => {
      return newPassword ? hashSync(newPassword, salt) : undefined
    }

    if (!password) {
      return res.status(422).json({
        message: "Senha atual necessaria para atualizar cadastro"
      })
    }

    User.findOne({ _id: userId })
      .then(response => {
        if (compareSync(password, response!.password)) {
          User.findOneAndUpdate({ _id: userId }, {
            name,
            email,
            password: newPasswordHash(),
            tell
          })
            .then((response) => {
              if (response) {
                return res.status(200).json({
                  name: response.name,
                  email: response.email,
                  tell: response.tell,
                  userId: response._id
                })
              }
            })
            .catch(error => {
              return res.status(422).json({
                aqui: "aqui",
                message: "Erro ao tentar atualizar cadastro",
                error
              })
            })
        } else {
          return res.status(422).json({
            message: "As senha atual esta incorreta, verifique a senha ou faça um reset"
          })
        }
      })
      .catch(error => {
        return res.status(422).json({
          message: "Erro ao tentar atualizar cadastro",
          error: error
        })
      })
  }
}