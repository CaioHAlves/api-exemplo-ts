import { Request, Response } from 'express'
import { Charge } from '../../models/charges'
import { User } from '../../models/user'

export class ChargeCreate {
  static async create(req: Request, res: Response) {
    const { clean, deadlift, userId } = req.body

    if (!userId) {
      return res.status(422).json({
        message: "Erro ao tentar salvar as cargas!"
      })
    }

    User.findById(userId)
      .then(() => {
        Charge.create({ clean, deadlift, userId })
          .then(response => {
            return res.status(201).json({
              clean,
              deadlift,
              userId,
              id: response._id
            })
          })
          .catch(() => {
            return res.status(422).json({
              message: "Erro ao tentar salvar as cargas!"
            })
          })
      })
      .catch(() => {
        return res.status(422).json({
          message: "Erro ao tentar salvar as cargas para usuario!"
        })
      })
  }
}