import { Request, Response } from 'express'

const index = (req: Request, res: Response) => {
  res.render('main/index')
}

const hb1 = (req: Request, res: Response) => {
  res.render('main/hb1', {
    mensagem: 'Universiade Federal do Amazonas',
  })
}

const hb2 = (req: Request, res: Response) => {
  res.render('main/hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  })
}

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ]
  res.render('main/hb3', {
    profes,
  })
}

const hb4 = (req: Request, res: Response) => {
  const tecs = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ]
  res.render('main/hb4', { tecs })
}

const hb5 = (req: Request, res: Response) => {
  res.render('main/hb5')
}

const sobre = (req: Request, res: Response) => {
  res.render('main/sobre')
}

const createCookie = (req: Request, res: Response) => {
  if (!('new-cookie' in req.cookies)) {
    res.cookie('new-cookie', 1234)
    res.send('Você nunca passou por aqui!')
  } else {
    res.send('Você já passou por aqui!!')
  }
}
const clearCookie = (req: Request, res: Response) => {
  res.clearCookie('new-cookie').send('Cookie apagado')
}

const changeTheme = (req: Request, res: Response) => {
  const { theme } = req.params
  if (!theme) return res.send('O parâmetro theme é obrigatório')
  res.cookie('theme', theme)
  res.redirect('/')
}

export default {
  index,
  hb1,
  hb2,
  hb3,
  hb4,
  hb5,
  sobre,
  createCookie,
  clearCookie,
  changeTheme
}
