import Router from 'express';
import { pathToFileURL } from 'url';
import { basicAuth } from '../helpers';
import { bloggers } from '../routes/bloggers';
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
      .findOne({ id: id });
    if (post) {

      return post;
    } else {

      return null;
    }
  },

  async createPost(
    title: string,
    content: string,
    bloggerId: number
  ): Promise<Post> {
    const newPost = {
      id: +new Date(),
      title,
      shortDescription: 'Description of post',
      content,
      bloggerId,
      bloggerName: 'Name of Blogger',
    };
    const post = await client.db('blog').collection('post').insertOne(newPost);

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
