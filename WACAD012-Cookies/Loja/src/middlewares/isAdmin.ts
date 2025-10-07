import { Request, Response, NextFunction } from 'express'

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.isAdmin)
    return res.status(401).json({ msg: 'Sem autorização' })
  next()
}

export default isAdmin
