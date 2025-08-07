const http = require('http')
const fs = require('fs')

const targetDir = process.argv[2] 

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    fs.readdir(targetDir,(err, files) => {
        files.forEach( f => res.write(`${f}<br>`))
        res.end()
    })
    
})

server.listen(3000, () => {
    console.log("servidor rodando")
  
})