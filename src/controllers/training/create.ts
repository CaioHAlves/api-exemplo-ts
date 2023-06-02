import { Request, Response } from 'express';
import { Training } from '../../models/training'
import { User } from '../../models/user'

export class TrainingCreate {
  static async create(req: Request, res: Response) {
    const { id } = req.headers
    const { name, heating, practice, wod, fortification } = req.body

    User.findOne({ _id: id })
      .then(response => {
        if (response && response.isAStudent === false) {
          Training.create({name, heating, practice, wod, fortification})
            .then((response) => {
              return res.status(201).json({
                name, 
                heating, 
                practice, 
                wod, 
                fortification,
                id: response._id
              })
            })
            .catch(() => {
              return res.status(422).json({
                message: "Erro ao criar aula!" 
              })
            })
        } else {
          return res.status(422).json({
            message: "Erro ao criar aula!" 
          })
        }
      })
      .catch(() => {
        return res.status(422).json({
          message: "Erro ao criar aula! Usuário é aluno."
        })
      })
  }
}