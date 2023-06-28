import { Request, Response } from 'express'
import { Charge } from '../../models/charges'

export class ChargeGet {
  static async getForUser(req: Request, res: Response) {
    const { userId } = req.params

    if (!userId) {
      res.status(422).json({
        message: "Não foi possivel obter dados!"
      })
    }

    Charge.findOne({ userId })
      .then(response => {
        if (response) {
          return res.status(200).json({
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
            jerk: response.jerk,
            oneMile: response.oneMile,
            userId
          })
        } else {
          return res.status(200).json(null)
        }
      })
      .catch(error => {
        return res.status(422).json({
          message: "Erro ao obter dados",
        })
      })
  }
}
