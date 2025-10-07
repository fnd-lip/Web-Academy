import { Request, Response } from 'express'
import { userSchema } from './user.schema'
import { CreateUserDto } from './user.types'
import validator from '../../utils/validator'
import { createUser } from './user.service'
const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('user/create')
  } else {
    try {
      const user = req.body as CreateUserDto
      user.typeId = Number(user.typeId)
      const errors = validator(userSchema, user)
      if (Object.keys(errors).length > 0) {
        if (errors.repeatPassword)
          errors.repeatPassword = 'O valor deve ser igual ao campo da senha'
        return res.render('user/create', {
          errors,
          user,
        })
      }
      await createUser(user)
      res.status(201).redirect('/')
    } catch (err) {
      console.log(err)
      res.status(500).send({ msg: 'Erro ao cadastrar usuário' })
    }
  }
}

export default { create }