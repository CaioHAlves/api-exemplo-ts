import { Request, Response } from 'express';
import { User } from '../../models/user'
import { UserMeasurements } from '../../models/userMeasurements'

export class UserDelete {
  static delete(req: Request, res: Response) {
    const { userId } = req.params

    UserMeasurements.deleteMany({ userId: userId })
      .then(() => {
        User.findOneAndDelete({ _id: userId })
          .then(() => {
            return res.status(200).json({
              message: "Conta apagada com sucesso"
            })
          })
          .catch(() => {
            return res.status(422).json({
              message: "Erro ao apagar conta"
            })
          })
      })
      .catch(() => {
        return res.status(422).json({
          message: "Erro ao apagar os dados conta"
        })
      })
  }
}