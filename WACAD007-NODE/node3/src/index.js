import http from 'http';
import fsPromises from 'fs/promises';
import dotenv from 'dotenv';
import {template} from './libs/html.js';
import { loremIpsum } from "lorem-ipsum";

dotenv.config({ path: `.env.${process.env.NODE_ENV ?? "development"}` })

const PORT = process.env.PORT || 80;
const FOLDER = process.env.FOLDER || './public';

const server = http.createServer(async(req, res) => {
    if(req.url === '/css/styles.css'){
        const css = await fsPromises.readFile("./public/css/styles.css")
        res.end(css)
    } else {
        let p = 0
        if(req.url.includes('p=')){
            p= parseInt(req.url.split('p=')[1]) || 0
        }
        console.log(req.url)
        res.end(template(loremIpsum({
            count: p || 1,        
            format: "html",            
            paragraphLowerBound: 3,
            paragraphUpperBound: 7,
            random: Math.random,
            sentenceLowerBound: 5,
            sentenceUpperBound: 15,
            suffix: "\n",
            units: "paragraphs"
        }),p))
    }
});

server.listen(PORT, () =>
  console.log(`🚀 http://localhost:${PORT} (${process.env.NODE_ENV})`)
);
