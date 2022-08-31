import { descriptionValidator } from './../validators/description';
import { titleValidator } from './../validators/title';
import Router from 'express';
import { basicAuth } from '../helpers';
import { bloggersRepository } from '../repositories/bloggers';
import { postsRepository } from '../repositories/posts';
import { contentValidator } from '../validators/content';
import { error } from '../validators/error-post';

const router = Router();

export type Bloggers = {
  id: number;
  name: string;
  youtubeUrl: string;
};


const errorMessage = (field: string, message: string) => {
  return {
    message: message,
    field: field,
  };
};

router.get('', async (req, res) => {
  const title = req.query.title?.toString();
  const bloggers = await bloggersRepository.findBloggers(title);
  res.send(bloggers);
});

router.get('/:id', async (req, res) => {
  const id = +req.params.id;
  const blogger = await bloggersRepository.findBloggerById(id);
  if (blogger) {
    res.send(blogger);
  } else {
    res.send(404);
  }
});

router.get('/:bloggerId/posts', async (req, res) => {
  const bloggerId = +req.params.bloggerId;
  const pageNumber = req.query.pageNumber || 0;
  const pageSize = req.query.PageSize || 10;
  const skip = (+pageNumber - 1) * +pageSize;
  const bloggers = await postsRepository.findPostsBloggersWithPagination(
    bloggerId,
    skip,
    +pageSize
  );
  const totalCount = await postsRepository.getQuantityPostsOfBlogger(bloggerId);
  const page = Math.ceil(totalCount / +pageSize);

  const pagination = {
    pagesCount: pageNumber,
    page,
    pageSize,
    totalCount,
  };

  if (bloggers) {
    res.send({ items: bloggers, pagination });
  } else {
    res.send(404);
  }
});

router.post('', basicAuth, async (req, res) => {
  const pattern =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

  const { name, youtubeUrl } = req.body;
  console.log('youtubeUrl: ', youtubeUrl);
  console.log('name: ', name);
  const isValidYoutubeLink = pattern.test(youtubeUrl);
  const errorsMessages: { message: string; field: string; }[] = [];

  if (!name?.trim() || name?.length >= 15) {
    errorsMessages.push(
      errorMessage('name', 'Title is too long max 40 symbols')
      );
    }
    console.log('isValidYoutubeLink: ', isValidYoutubeLink);
    if (!youtubeUrl || youtubeUrl?.length >= 100 || !isValidYoutubeLink)
    errorsMessages.push(errorMessage('youtubeUrl', 'shortDescription'));

    if (errorsMessages.length > 0)
    return res.status(400).send({ errorsMessages: errorsMessages });


    if (name?.trim() && youtubeUrl) {
      const newBlogger = await bloggersRepository.createBlogger(name, youtubeUrl);

      res.status(201).send(newBlogger);
  } else {
    res.status(400).send({
      errorsMessages: [
        {
          message: 'No title , you should pass valid blogger',
          field: 'title',
        },
      ],
    });
  }
});

router.post(
  '/:bloggerId/posts',
  basicAuth,
  titleValidator,
  descriptionValidator,
  contentValidator,
  error,
  async (req, res) => {
    const { title, shortDescription, content } = req.body;
    const bloggerId = +req.params?.bloggerId;
    if (!bloggerId) res.send(400);

    const post = await postsRepository.createPost(
      title,
      content,
      shortDescription,
      bloggerId
    );

    console.log('post', post);

    if (post) {
      res.send(post);
    } else {
      res.send(404);
    }
  }
);

router.put('/:id', basicAuth, async (req, res) => {
  const pattern =
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;

  const { name, youtubeUrl } = req.body;
  const isValidYoutubeLink = pattern.test(youtubeUrl);
  const id = +req.params.id;
  const errorsMessages = [];

  if (!name?.trim() || name.length > 15)
    errorsMessages.push(
      errorMessage('name', 'Title is too long max 40 symbols')
    );
  if (!youtubeUrl || youtubeUrl?.length >= 100 || !isValidYoutubeLink)
    errorsMessages.push(errorMessage('youtubeUrl', 'shortDescription'));

  if (errorsMessages.length > 0)
    return res.status(400).send({ errorsMessages: errorsMessages });

  const isUpdated = await bloggersRepository.updateBlogger(
    id,
    name,
    youtubeUrl
  );
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
  const isDeleted = await bloggersRepository.deleteBloggers(id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

export { router as bloggersRouter };
