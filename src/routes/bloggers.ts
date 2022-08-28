import Router from 'express'
import {basicAuth} from '../helpers';

const router = Router();

export const bloggers = [
    {
        id: 0,
        name: 'Anna ',
        youtubeUrl: 'string'
    },
    {
        id: 1,
        name: 'Ken ',
        youtubeUrl: 'string'
    },
    {
        id: 2,
        name: 'Tina ',
        youtubeUrl: 'string'
    },
    {
        id: 3,
        name: 'Dim ',
        youtubeUrl: 'string'
    },
    {
        id: 4,
        name: 'Melon ',
        youtubeUrl: 'string'
    },
]

const errorMessage = (field: string, message: string) => {
    return {
                "message": message,
                "field": field
            }

}

router.get('', (req, res) => {
    
    res.send(bloggers)
})

router.get('/:id', (req, res) => {
    const id = +req.params.id
    const blogger = bloggers.find((v) => v.id === id)
    if (blogger) {
        res.send(blogger)
    } else {
        res.send(404)
    }

})

router.get('/:bloggersId/posts', (req, res)=> {

})

router.post('',basicAuth, (req, res) => {
    const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

    const {name, youtubeUrl} = req.body
    const isValidYoutubeLink = pattern.test(youtubeUrl)
    const errorsMessages = []


    if (!name?.trim() || name.length >= 15) {
        errorsMessages.push(errorMessage('name', 'Title is too long max 40 symbols'))
    }
    if (!youtubeUrl || youtubeUrl.length >= 100 || !isValidYoutubeLink) errorsMessages.push(errorMessage('youtubeUrl', 'shortDescription'))

    if (errorsMessages.length > 0) return res.status(400).send({errorsMessages:errorsMessages})

    if (name?.trim() && youtubeUrl) {
        const newBlogger= {
            id: bloggers.length + 1,
            name,
            youtubeUrl
        }
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "No title , you should pass valid blogger",
                    "field": "title"
                }
            ]
        })
    }
})

router.put('/:id',basicAuth, (req, res) => {

    const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

    const {name, youtubeUrl} = req.body
    const isValidYoutubeLink = pattern.test(youtubeUrl)
    const id = +req.params.id
    const errorsMessages = []

    if (!name?.trim() || name.length > 15) errorsMessages.push(errorMessage('name', 'Title is too long max 40 symbols'))
    if (!youtubeUrl || youtubeUrl.length >= 100 || !isValidYoutubeLink) errorsMessages.push(errorMessage('youtubeUrl', 'shortDescription'))

   if(errorsMessages.length > 0) return res.status(400).send({errorsMessages:errorsMessages})

    const index = bloggers.findIndex(v => v.id === id)
    if (index >= 0) {
        console.log(bloggers[index])
        console.log({...bloggers[index], ...req.body})
        bloggers[index] = {...bloggers[index], ...req.body}
        res.send(204)
    } else {
        res.status(404).send({
            "errorsMessages": [
                {
                    "message": "No title , you should pass valid title",
                    "field": "title"
                }
            ]
        })
    }

})
router.delete('/:id',basicAuth, (req, res) => {
    const id = +req.params.id
    const index = bloggers.findIndex(v => v.id === id)
    if (index >= 0) {
        bloggers.splice(index, 1)
        res.send(204)
    } else {
        res.send(404)
    }
})


export {router as bloggersRouter}
