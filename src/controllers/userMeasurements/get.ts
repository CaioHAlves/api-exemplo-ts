import { Request, Response } from 'express'
import { UserMeasurements } from '../../models/userMeasurements'

export class UserMeasurementsGet {
  static async getForUser(req: Request, res: Response) {
    const { userId } = req.params

    if (!userId) {
      res.status(422).json({
        message: "Não foi possivel obter dados!"
      })
    }

    UserMeasurements.findOne({ userId })
      .then(response => {
        if (response) {
          return res.status(200).json({
            id: response._id,
            weight: response.weight,
            arm: response.arm,
            waist: response.waist,
            leg: response.leg,
            imc: response.imc,
            bodyFat: response.bodyFat,
            leanMass: response.leanMass,
            height: response.height,
            userId,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
          })
        } else {
          return res.status(422).json({
            message: "Erro ao obter dados"
          })
        }
      })
      .catch(error => {
        return res.status(422).json({
          message: "Erro ao obter dados",
          ...error
        })
      })
  }
}
