import { Request, Response } from 'express'
import { UserMeasurements } from '../../models/userMeasurements'
import { User } from '../../models/user'

export class UserMeasurementsCreate {
  static async post(req: Request, res: Response) {
    const { userId, weight, arm, waist, leg, bodyFat, leanMass, height } = req.body

    if (!userId) {
      res.status(422).json({
        message: "Não foi possivel realizar cadastro!"
      })
    }

    const heightForDataBase = height / 100
    const imcForDataBase = weight / (heightForDataBase * heightForDataBase)

    User.findById(userId)
      .then((response) => {
        UserMeasurements.create({
          weight, 
          arm, 
          waist, 
          leg, 
          imc: imcForDataBase.toFixed(2), 
          bodyFat, 
          leanMass, 
          height,
          userId: response!._id
        })
          .then(response => {
            return res.status(201).json(response)
          })
          .catch(error => {
            return res.status(422).json({
              message: "Erro ao cadastrar dados",
              ...error
            })
          })
      })
      .catch((error) => {
        return res.status(422).json({
          message: "Erro ao cadastrar dados",
          ...error
        })
      })
  }
}
