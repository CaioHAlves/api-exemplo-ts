import { Request, Response } from 'express';
import { Training } from '../../models/training'
import { User } from '../../models/user'

export class TrainingUpdate {
  static update(req: Request, res: Response) {
    const { idusuario } = req.headers
    const { id } = req.params
    const { name, heating, practice, wod, fortification } = req.body

    User.findOne({ _id: idusuario })
      .then(response => {
        if (response && response.isAStudent === false) {
          Training.findOneAndUpdate({ _id: id }, {name, heating, practice, wod, fortification})
            .then(() => {
              return res.status(200).json({
                name,
                heating,
                practice,
                wod, 
                fortification,
                id: id
              })
            })
            .catch(() => {
              return res.status(422).json({
                message: "Erro ao criar aula!" 
              })
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