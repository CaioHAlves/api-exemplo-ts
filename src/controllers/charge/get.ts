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
            deadlift: response.deadlift,
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
