import Router from 'express'

const router = Router();

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

router.get('', (req, res) => {
    res.send(videos)
})
router.get('/:id', (req, res) => {
    const id = +req.params.id
    const video = videos.find((v) => v.id === id)
    if (video) {
        res.send(video)
    } else {
        res.send(404)
    }

})
router.post('', (req, res) => {
    const title = req.body.title
    if(!title){
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": 'Title is undefined',
                    "field": "title"
                }
            ]
        })
    }
    if (title && title.length > 40) return res.status(400).send({
        "errorsMessages": [
            {
                "message": 'Title is too long max 40 symbols',
                "field": "title"
            }
        ]
    })
    if (title) {
        const newVideo = {
            id: videos.length + 1,
            title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "No title , you should pass valid title",
                    "field": "title"
                }
            ]
        })
    }
})
router.put('/:id',(req, res) => {
    const id = +req.params.id
    const title = req.body.title
    if (!title) {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": 'Title is undefined',
                    "field": "title"
                }
            ]
        })
    }
    if ( title.length > 40) return res.status(400).send({
        "errorsMessages": [
            {
                "message": 'Title is too long max 40 symbols',
                "field": "title"
            }
        ]
    })

    const index = videos.findIndex(v => v.id === id)
    if (index >= 0) {
        videos[index].title = title
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
    const index = videos.findIndex(v => v.id === id)
    if (index >= 0) {
        videos.splice(index, 1)
        res.send(204)
    } else {
        res.send(404)
    }
}))


export {router as videoRouter}