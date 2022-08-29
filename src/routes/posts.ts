import Router from 'express';
import { basicAuth } from '../helpers';
import { bloggersRepository } from '../repositories/bloggers';
import { postsRepository } from '../repositories/posts';
import { bloggers } from './bloggers';

const router = Router();

export type Post = {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName: string;
};

const posts: Post[] = [
  {
    id: 0,
    title: 'Title of post ',
    shortDescription: 'Description of post',
    content: 'Content of post',
    bloggerId: 0,
    bloggerName: 'Name of Blogger',
  },
  {
    id: 1,
    title: 'Title of post ',
    shortDescription: 'Description of post',
    content: 'Content of post',
    bloggerId: 1,
    bloggerName: 'Name of Blogger',
  },
  {
    id: 2,
    title: 'Title of post ',
    shortDescription: 'Description of post',
    content: 'Content of post',
    bloggerId: 2,
    bloggerName: 'Name of Blogger',
  },
  {
    id: 3,
    title: 'Title of post ',
    shortDescription: 'Description of post',
    content: 'Content of post',
    bloggerId: 3,
    bloggerName: 'Name of Blogger',
  },
  {
    id: 4,
    title: 'Title of post ',
    shortDescription: 'Description of post',
    content: 'Content of post',
    bloggerId: 4,
    bloggerName: 'Name of Blogger',
  },
];

router.get('', async (req, res) => {
  const title = req.query.title?.toString();
  const posts = await postsRepository.findPosts(title);
  res.send(posts);
});

router.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const post = await postsRepository.findPostById(id);
  if (post) {
    res.send(post);
  } else {
    res.send(404);
  }
});

const errorMessage = (field: string, message: string) => {
  return {
    message: message,
    field: field,
  };
};

router.post('', basicAuth, async (req, res) => {
  const errorsMessages = [];

  const { title, shortDescription, content, bloggerId } = req.body;

  const blogger = await bloggersRepository.findBloggerById(bloggerId);


  if (!title?.trim() || title.length >= 30)
    errorsMessages.push(
      errorMessage('title', 'Title is too long max 40 symbols')
    );
  if (!shortDescription?.trim() || shortDescription.length >= 100)
    errorsMessages.push(errorMessage('shortDescription', 'shortDescription'));
  if (!content?.trim() || content.length >= 1000)
    errorsMessages.push(errorMessage('content', 'content'));
  if (!blogger) errorsMessages.push(errorMessage('bloggerId', 'bloggerId'));

  if (errorsMessages.length > 0)
    return res.status(400).send({ errorsMessages: errorsMessages });

  if (title && shortDescription && content && bloggerId) {
   
    const createdPost = await postsRepository.createPost(
      title,
      content,
      bloggerId
    );
    res.status(201).send(createdPost);
  } else {
    res.status(400).send({
      errorsMessages: [
        {
          message: 'No title , you should pass valid post',
          field: 'title',
        },
      ],
    });
  }
});

router.put('/:id', basicAuth, async (req, res) => {
  const errorsMessages = [];

  const id = +req.params.id;
  const { title, shortDescription, content, bloggerId } = req.body;
  const blogger = bloggers.find((b) => b.id === bloggerId);

  if (!title?.trim() || title?.length >= 30)
    errorsMessages.push(
      errorMessage('title', 'Title is too long max 40 symbols')
    );
  if (!shortDescription?.trim() || shortDescription?.length >= 100)
    errorsMessages.push(errorMessage('shortDescription', 'shortDescription'));
  if ((content && !content?.trim()) || content?.length >= 1000)
    errorsMessages.push(errorMessage('content', 'content'));
  if (!blogger) errorsMessages.push(errorMessage('bloggerId', 'bloggerId'));

  if (errorsMessages.length > 0)
    return res.status(400).send({ errorsMessages: errorsMessages });

  const isUpdated = await postsRepository.updatePost(id,title, content, bloggerId);

  if (isUpdated) {
    res.send(204);
  } else {
    res.status(404).send({
      errorsMessages: [
        {
          message: 'No title , you should pass valid title',
          field: 'title',
        },
      ],
    });
  }
});

router.delete('/:id', basicAuth, async (req, res) => {
  const id = +req.params.id;
  const isDeleted = await postsRepository.deletePost(id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

export { router as postsRouter };
