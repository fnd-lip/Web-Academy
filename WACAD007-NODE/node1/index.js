const http = require("http")
const fs = require("fs")
const dotenv = require("dotenv")

dotenv.config()

const targetDir = process.argv[2]
const PORT = process.env.PORT
console.log(PORT)

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" })
  fs.readdir(targetDir, (err, files) => {
    files.forEach(f => res.write(`${f}<br>`))
    res.end()
  })
})

server.listen(PORT, () => {
  console.log("servidor rondando", PORT);
})
