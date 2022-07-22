import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import {videoRouter} from "./routes";

const app = express()
const port = process.env.PORT || 6000

const parserMiddleware = bodyParser({})

app.use(parserMiddleware)
// app.use(cors({origin: '*'}))









// const products = [{id: 1, title: "tomato"}, {id: 2, title: 'orange'}]
// const addresses = [{id: 1, value: "Minsk"}, {id: 2, value: 'Kiev'}]

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/videos', videoRouter);
// /* get with query */
// app.get('/products', (req, res) => {
//     const title = req.query.title
//     console.log("-> title", title);
//     if (title) {
//         const responseProducts = products.filter(product => product.title.includes(title as string))
//         res.send(responseProducts)
//     } else {
//         res.send(products)
//     }
// })
// app.get('/products/:id', (req, res) => {
//     const id = +req.params.id
//     console.log("-> id", id);
//
//     const productsRes = products.find(product => product.id === id)
//     console.log("-> productsRes", productsRes);
//
//     if (!productsRes) return res.status(404).send('Wrong params')
//
//     console.log("-> productsRes", productsRes)
//     res.send(productsRes);
// })
// app.get('/addresses', (req, res) => {
//     res.send(addresses)
// })
//
// app.delete('/products/:id', (req, res) => {
//     const id = +req.params.id
//
//     products.forEach((product, i) => {
//         if (product.id === id) {
//             products.splice(i, 1)
//             res.status(204)
//             return
//         }
//     })
//
//     res.status(404).send('Not Found')
// })
//
// app.post('/products', (req, res) => {
//     const title = req.body.title
//     const id = products.length + 1
//     const product = {
//         id,
//         title
//     }
//     products.push(product)
//     console.log("-> product", product);
//     res.status(201).send(product)
// })
//
// app.put('/products/:id', (req, res) => {
//     const id = +req.params.id
//     const title = req.body.title
//     products.forEach((product, index) => {
//         if (product.id === id) {
//             products[index].title = title
//             res.send(products[index])
//             return
//         } else {
//             res.send(404)
//         }
//     })
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
