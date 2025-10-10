import { Request, Response } from 'express'
import { CreateClientDto, LoginDto } from './auth.types'
import { signupSchema, loginSchema } from './auth.schema'
import validator from '../../utils/validator'
import { checkCredentials, createClient } from './auth.service'
import { UserTypes } from '../userType/userType.constants'
import {
  findOrCreatePurchaseCart,
  setUserIdToPurchase,
} from '../purchase/purchase.service'

const signup = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('auth/signup')
  } else {
    try {
      const user = req.body as CreateClientDto
      const errors = validator(signupSchema, user)
      if (Object.keys(errors).length > 0) {
        if (errors.repeatPassword)
          errors.repeatPassword = 'O valor deve ser igual ao campo da senha'
        return res.render('auth/signup', {
          errors,
          user,
        })
      }
      await createClient(user)
      res.status(201).redirect('/auth/login')
    } catch (err) {
      console.log(err)
      res.status(500).send({ msg: 'Erro ao cadastrar usuário' })
    }
  }
}
const login = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('auth/login')
  } else {
    const credentials = req.body as LoginDto
    const user = await checkCredentials(credentials)
    const errors = validator(loginSchema, credentials)
    if (!user || Object.keys(errors).length > 0) {
      if (!user && !errors.password)
        errors.password = ' Email e/ou senha incorretos'
      return res.render('auth/login', {
        errors,
        credentials,
      })
    } else {
      req.session.isAuth = true
      req.session.userId = user.id
      if (req.session.guestPurchaseId)
        await findOrCreatePurchaseCart(
          req.session.guestPurchaseId,
          req.session.userId,
        )
      req.session.isAdmin = user.typeId === UserTypes.admin ? true : false
      res.redirect('/')
    }
  }
}
const logout = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) console.log(err)
  })
  res.redirect('/')
}

export default { signup, login, logout }
