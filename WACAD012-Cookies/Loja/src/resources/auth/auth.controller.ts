import { Request, Response } from 'express'
import { CreateClientDto } from './auth.types'
import signupSchema from './auth.schema'
import validator from '../../utils/validator'
import { createClient } from './auth.service'

const signup = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('auth/signup')
  } else {
    try {
      const user = req.body as CreateClientDto
      const errors = validator(signupSchema, user)
      if (Object.keys(errors).length > 0) {
        if (errors.repeatPassword) errors.repeatPassword = 'O valor deve ser igual ao campo da senha'
        return res.render('auth/signup', {
          errors,
          user,
        })
      }
      const newUser = createClient(user)
      res.status(201).redirect('/')
    } catch (err) {
      console.log(err)
      res.status(500).send({msg: "Erro ao cadastrar usuário"})
    }
  }
}
const login = async (req: Request, res: Response) => {}
const logout = async (req: Request, res: Response) => {}

export default { signup, login, logout }
