import express from 'express'
import bodyParser from "body-parser";
import {postsRouter, videoRouter, bloggersRouter, productsRouter } from "./routes";

const app = express()
const port = process.env.PORT || 6000

const parserMiddleware = bodyParser({})

app.use(parserMiddleware)









// const addresses = [{id: 1, value: "Minsk"}, {id: 2, value: 'Kiev'}]

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/videos', videoRouter);
app.use('/bloggers', bloggersRouter);
app.use('/posts', postsRouter);
app.use('/products', productsRouter);

// app.get('/addresses', (req, res) => {
//     res.send(addresses)
// })
//
//

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
