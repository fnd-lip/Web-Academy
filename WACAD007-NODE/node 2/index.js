import http from "http"
import fs from "fs"
import dotenv from "dotenv"

import * as html from "./src/lib/util.js"

dotenv.config({path: `.env.${process.env.NODE_ENV ?? "development"}`, quiet: true})

const PORT = process.env.PORT ?? 4455
const FOLDER = process.env.FOLDER ?? "public"
console.log(PORT)

const server = http.createServer((req, res) => {

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8"})

  if (req.url === "/"){
    console.log(`${process.cwd()}/${FOLDER}`);
    fs.readdir(`${process.cwd()}/${FOLDER}`, (err, files) => {
     if(err) console.log(err)
     else files.forEach(file => res.write(html.createLink(file)))
      res.end()
    })
  } else if (req.url !== "/favicon.ico"){
    const path = `${process.cwd()}/${FOLDER}${req.url}`
    fs.readFile(path, (err, content) => {
      if (err) console.log(err, "erro ao ler o arquivo")
      else {
        res.write(html.createBackLink())
        res.write(content.toString()) 
      }
      res.end()
    })
  }
})

server.listen(PORT, () => {
  console.log("servidor rondando", PORT)
})
