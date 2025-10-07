import { Request, Response, NextFunction } from 'express'

const setLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.isAuth = req.session.isAuth
  res.locals.isAdmin = req.session.isAdmin
  next()
}

export default setLocals
