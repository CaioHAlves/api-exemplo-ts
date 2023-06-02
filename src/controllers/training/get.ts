import { Request, Response } from 'express'
import { Training } from '../../models/training'

export class TrainingGet {
  static get(_req: Request, res: Response) {
    Training.findOne()
      .then(response => {
        if (response) {
          return res.status(200).json({
            id: response._id,
            heating: response.heating,
            practice: response.practice,
            fortification: response.fortification,
            wod: response.wod,
            name: response.name,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
          })
        } else {
          return res.status(400).json({
            message: "Não encontramos nenhuma aula para hoje!"
          })
        }
      })
      .catch(() => {
        return res.status(400).json({
          message: "Erro ao procurar aula"
        })
      })
  }
}