import { Request, Response } from 'express'
import { User } from '../../models/user'

export class UserGetAll {
  static async getAllUsers(req: Request, res: Response) {

    const { name, email } = req.query as { name: string, email: string }

    let matchs: any = {}

    if (email) {
      matchs.email = email
    }

    User.find(matchs)
      .then(response => {

        let dadosApi = []

        if (name) {
          dadosApi = response.filter(users => users.name.toLowerCase().includes(name.toLowerCase())).map(item => ({
            name: item.name,
            email: item.email,
            tell: item.tell,
            id: item._id
          }))
        } else {
          dadosApi = response.map(item => ({
            name: item.name,
            email: item.email,
            tell: item.tell,
            id: item._id
          }))
        }

        return res.status(200).json(dadosApi)
      })
      .catch(error => {
        return res.status(422).json(error)
      })
  }
}