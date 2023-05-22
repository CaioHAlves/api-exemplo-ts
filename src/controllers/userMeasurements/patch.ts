import { Request, Response } from 'express'
import { UserMeasurements } from '../../models/userMeasurements'

export class UserMeasurementsPatch {
  static async patch(req: Request, res: Response) {
    const { measurementsId } = req.params
    const { weight, arm, waist, leg, bodyFat, leanMass, height } = req.body

    if (!measurementsId) {
      res.status(422).json({
        message: "Não foi possivel atualizar cadastro!"
      })
    }

    const heightForDataBase = height / 100
    const imcForDataBase = weight / (heightForDataBase * heightForDataBase)

    UserMeasurements.findOneAndUpdate({_id: measurementsId}, {
      weight,
      arm,
      waist,
      leg,
      imc: imcForDataBase.toFixed(2),
      bodyFat,
      leanMass,
      height
    })
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
          message: "Erro ao atualizar dados",
          ...error
        })
      })
  }
}