import { Request, Response } from 'express'
import { Charge } from '../../models/charges'
import { User } from '../../models/user'

export class ChargeUpdate {
  static async update(req: Request, res: Response) {
    const { id } = req.params
    const { 
      clean, cleanJerk, powerClean, 
      squatClean, frontSquat, backSquat, 
      snatch, powerSnatch, deadlift, userId,
      jerk
    } = req.body

    if (!userId) {
      return res.status(422).json({
        message: "Erro ao tentar atualizar as cargas!"
      })
    }

    User.findById(userId)
      .then(() => {
        Charge.findByIdAndUpdate({ _id: id }, { 
          clean, cleanJerk, powerClean, 
          squatClean, frontSquat, backSquat, 
          snatch, powerSnatch, deadlift, userId,
          jerk
        })
          .then(response => {
            return res.status(200).json({
              id: response!._id,
              clean, 
              cleanJerk, 
              powerClean, 
              squatClean, 
              frontSquat, 
              backSquat, 
              snatch, 
              powerSnatch, 
              deadlift,
              jerk,
              userId
            })
          })
          .catch(() => {
            return res.status(422).json({
              message: "Erro ao tentar atualizar as cargas!"
            })
          })
      })
      .catch(() => {
        return res.status(422).json({
          message: "Erro ao tentar atualizar as cargas para usuario!"
        })
      })
  }
}