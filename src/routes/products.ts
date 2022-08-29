import Router from 'express'
import {productsRepository} from "../repositories";

const router = Router();


/* get with query */
router.get('', (req, res) => {
    const title = req.query.title?.toString()
    const foundProducts = productsRepository.findProducts(title)
    res.send(foundProducts);
})

router.get('/:id', (req, res) => {
    const id = +req.params.id

    const productsRes = productsRepository.getProductById(id)

    if (!productsRes) return res.status(404).send('Wrong params')

    res.send(productsRes);
})
router.delete('/:id', (req, res) => {
    const id = +req.params.id

    const isDeleted = productsRepository.deleteProduct(id)

    if(!isDeleted) return res.status(404).send('Not Found')
    res.status(204)

})

router.post('', (req, res) => {
    const title = req.body.title?.toString()
    const newProduct = productsRepository.createProduct(title)
    res.status(201).send(newProduct)
})

router.put('/:id', (req, res) => {
    const id = +req.params.id
    const title = req.body.title
    const isUpdated = productsRepository.updateProduct(id,title)
       if (isUpdated){
         const product = productsRepository.getProductById(id)
           res.send(product)
       }else{
           res.send(404)
       }

})

export {router as productsRouter}