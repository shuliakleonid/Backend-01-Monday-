import Router from 'express'

const router = Router();

export const posts = [
    {
        id: 0,
        title: 'Title of post ',
        shortDescription: 'Description of post',
        content: 'Content of post',
        bloggerId: 0,
        bloggerName: 'Name of Blogger'
    }, {
        id: 1,
        title: 'Title of post ',
        shortDescription: 'Description of post',
        content: 'Content of post',
        bloggerId: 1,
        bloggerName: 'Name of Blogger'
    }, {
        id: 2,
        title: 'Title of post ',
        shortDescription: 'Description of post',
        content: 'Content of post',
        bloggerId: 2,
        bloggerName: 'Name of Blogger'
    }, {
        id: 3,
        title: 'Title of post ',
        shortDescription: 'Description of post',
        content: 'Content of post',
        bloggerId: 3,
        bloggerName: 'Name of Blogger'
    }, {
        id: 4,
        title: 'Title of post ',
        shortDescription: 'Description of post',
        content: 'Content of post',
        bloggerId: 4,
        bloggerName: 'Name of Blogger'
    }
]

router.get('', (req, res) => {
    res.send(posts)
})

router.get('/:id', (req, res) => {
    const id = +req.params.id
    const post = posts.find((v) => v.id === id)
    if (post) {
        res.send(post)
    } else {
        res.send(404)
    }

})

const errorMessage = (field: string, message: string) => {
    return {
        "errorsMessages": [
            {
                "message": message,
                "field": field
            }
        ]
    }
}

router.post('', (req, res) => {


    const {title, shortDescription, content, bloggerId} = req.body
    if (!title) {
        return res.status(400).send(errorMessage('title', 'Title is undefined'))
    }
    if (title && title.length >= 30) return res.status(400).send(errorMessage('title', 'Title is too long max 40 symbols'))
    if (!shortDescription || shortDescription.length >= 100) return res.status(400).send(errorMessage('shortDescription', 'shortDescription'))
    if (!content || content.length >= 1000) return res.status(400).send(errorMessage('content', 'content'))


    if (title && shortDescription && content && bloggerId) {
        const newPost = {
            id: posts.length + 1,
            title,
            shortDescription: 'Description of post',
            content,
            bloggerId,
            bloggerName: 'Name of Blogger'
        }
        posts.push(newPost)
        res.status(201).send(newPost)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "No title , you should pass valid post",
                    "field": "title"
                }
            ]
        })
    }
})

router.put('/:id', (req, res) => {
    const id = +req.params.id
    const {title, shortDescription, content, bloggerId} = req.body
    if (!title) {
        return res.status(400).send(errorMessage('title', 'Title is too long max 40 symbols'))
    }
    if (title.length > 40) return res.status(400).send(errorMessage('title', 'Title is too long max 40 symbols'))
    if (!shortDescription || shortDescription.length >= 100) return res.status(400).send(errorMessage('shortDescription', 'shortDescription'))
    if (!content || content.length >= 1000) return res.status(400).send(errorMessage('content', 'content'))

    const index = posts.findIndex(v => v.id === id)
    if (index >= 0) {
        console.log(posts[index])
        console.log({...posts[index],...req.body})
        posts[index] = {...posts[index],...req.body}
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
router.delete('/:id', ((req, res) => {
    const id = +req.params.id
    const index = posts.findIndex(v => v.id === id)
    if (index >= 0) {
        posts.splice(index, 1)
        res.send(204)
    } else {
        res.send(404)
    }
}))


export {router as postsRouter}