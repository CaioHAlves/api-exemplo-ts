import { Request, Response } from 'express'
import { User } from '../../models/user'

type IQuery = {
  name: string
  email: string
  page?: number
  limit?: number
}

export class UserGetAll {
  static async getAllUsers(req: Request<any, any, any, IQuery>, res: Response) {

    const { name, email, page, limit } = req.query

    let matchs: any = {}

    if (name) {
      matchs.name = name
    }

    if (email) {
      matchs.email = email
    }

    const pageForApi = page || 1
    const limitForApi = limit ? limit * 1 :  10
    const skip = limitForApi * (pageForApi - 1)

    User.find(matchs).sort({ name: 1 })
      .then(response => {

        const registersApi = response.map(item => ({
          name: item.name,
          email: item.email,
          tell: item.tell,
          id: item._id
        }))

        return res.status(200).json({
          items: registersApi.slice(skip, skip + limitForApi),
          totalItems: registersApi.length,
          totalPages: Math.ceil( registersApi.length / limitForApi )
        })
      })
      .catch(error => {
        return res.status(422).json(error)
      })
  }
}