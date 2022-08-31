import { Post } from './../routes/posts';
import { client } from './db';

export const postsRepository = {
  async findPosts(title: string | null | undefined): Promise<Post[]> {
    if (title) {
      return client
        .db('blog')
        .collection<Post>('posts')
        .find({ title: { $regex: title } })
        .toArray();
    } else {
      return client.db('blog').collection<Post>('posts').find({}).toArray();
    }
  },

  async findPostById(id: number): Promise<Post | null> {
    const post = await client
      .db('blog')
      .collection<Post>('posts')
      .findOne(
        { id: id },
        {
          projection: { _id: 0 },
        }
      );
    if (post) {
      return post;
    } else {
      return null;
    }
  },

  async findPostsBloggersWithPagination(
    id: number,
    skipQuantity: number,
    pageSize: number
  ): Promise<Post[] | null> {
    const posts = await client
      .db('blog')
      .collection<Post>('post')
      .find(
        { id: id },
        {
          projection: { _id: 0 },
        }
      )
      .skip(skipQuantity)
      .limit(pageSize)
      .toArray();
    if (posts) {
      return posts;
    } else {
      return null;
    }
  },

  async getQuantityPostsOfBlogger(id: number) {
    return client.db('blog').collection<Post>('post').count({ id: id });
  },

  async createPost(
    title: string,
    content: string,
    shortDescription: string,
    bloggerId: number
  ): Promise<Post> {
    const newPost = {
      id: +new Date(),
      title,
      shortDescription,
      content,
      bloggerId,
      bloggerName: 'Name of Blogger',
    };
    const post = await client
      .db('blog')
      .collection<Post>('post')
      .insertOne(newPost);
    // @ts-ignore
    delete newPost._id
    return newPost;
  },

  async updatePost(
    id: number,
    title: string,
    content: string,
    bloggerId: number
  ): Promise<boolean> {
    const result = await client
      .db('blog')
      .collection<Post>('posts')
      .updateOne(
        { id: id },
        {
          $set: {
            title: title,
            content: content,
            bloggerId: bloggerId,
          },
        }
      );

    return result.matchedCount === 1;
  },

  async deletePost(id: number): Promise<boolean> {
    const result = await client
      .db('blog')
      .collection<Post>('posts')
      .deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
