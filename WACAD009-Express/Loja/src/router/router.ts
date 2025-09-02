import { Router, Request, Response } from 'express'
import { loremIpsum } from 'lorem-ipsum'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const response = await fetch('https://fakestoreapi.com/products')
  const produtos = await response.json()
  res.render('index', {
    produtos,
  })
})

router.get('/produto/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await fetch(`https://fakestoreapi.com/products/${id}`)
  const produto = await response.json()
  res.render('produto', {
    produto,
  })
})

router.get('/sobre', (req, res) => {
  res.render('sobre')
})

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Web Academy</h1>
    <img src="/img/images.png"/>
    <script src="/js/script.js"></script>
</body>
</html>
`
router.get('/page', (req, res) => {
  res.send(html)
})

router.get('/google', (req, res) => {
  res.redirect('https://www.google.com')
})

router.get('/file', (req, res) => {
  res.sendFile(`${process.cwd()}/public/pdf/estati.pdf`)
})

router.get('/lorem/:qtd', (req: Request, res: Response) => {
  const qtd = Number(req.params.qtd) || 1
  res.send(loremIpsum({ count: qtd, units: 'paragraphs', format: 'html' }))
})

router.get('/hb1', (req, res) => {
  res.render('hb1', {
    mensagem: 'Universiade Federal do Amazonas',
  })
})

router.get('/hb2', (req, res) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  })
})

router.get('/hb3', (req, res) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ]
  res.render('hb3', {
    profes,
  })
})

router.get('/hb4', (req, res) => {
  const tecs = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ]
  res.render('hb4', { tecs })
})

router.get('/hb5', (req, res) => {
  res.render('hb5')
})

export default router
