import { Request, Response } from 'express'
import { Charge } from '../../models/charges'
import { User } from '../../models/user'

export class ChargeCreate {
  static async create(req: Request, res: Response) {
    const { 
      clean, cleanJerk, powerClean, 
      squatClean, frontSquat, backSquat, 
      snatch, powerSnatch, deadlift, userId,
      jerk, oneMile
    } = req.body

    if (!userId) {
      return res.status(422).json({
        message: "Erro ao tentar salvar as cargas!"
      })
    }

    User.findById(userId)
      .then(() => {
        Charge.create({ 
          clean, cleanJerk, powerClean, 
          squatClean, frontSquat, backSquat, 
          snatch, powerSnatch, deadlift, userId ,
          jerk
        })
          .then(response => {
            return res.status(201).json({
              id: response._id,
              clean: response.clean, 
              cleanJerk: response.cleanJerk, 
              powerClean: response.powerClean, 
              squatClean: response.squatClean, 
              frontSquat: response.frontSquat, 
              backSquat: response.backSquat, 
              snatch: response.snatch, 
              powerSnatch: response.powerSnatch, 
              deadlift: response.deadlift,
              oneMile: response.oneMile,
              jerk: response.jerk,
              userId
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