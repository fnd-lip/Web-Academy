import { Router, Request, Response } from 'express'
import { loremIpsum } from 'lorem-ipsum'
const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!🙂')
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

export default router
