import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../../models/user'

const salt = genSaltSync(12);

const generatePassword = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?';
  let senha = '';

  for (let i = 0; i < 8; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(indiceAleatorio);
  }

  return senha;
}

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


  static async resetPassword(req: Request, res: Response) {
    const { email, tell } = req.body

    const randomPassword = generatePassword()
    const newPassword = hashSync(randomPassword, salt)

    if (!email) {
      return res.status(422).json({
        message: "Necessario um email para resetar a senha!",
        field: "email"
      })
    }

    if (!tell) {
      return res.status(422).json({
        message: "Necessario um telefone para resetar a senha!",
        field: "tell"
      })
    }

    try {
      const user = await User.findOne({ email: email })
      
      if (user && user.tell === tell) {
        user.password = newPassword

        user.save()

        return res.status(200).json({
          message: "Senha alterada com sucesso!",
          password: randomPassword
        })
      } else {
        return res.status(422).json({
          message: "Dados informados estão incorretos"
        })
      }
    } catch (error) {
      return res.status(422).json({
        message: "Erro ao tentar alterar a senha"
      })
    }
  }
}