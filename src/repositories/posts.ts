import Router from 'express';
import { pathToFileURL } from 'url';
import { basicAuth } from '../helpers';
import { bloggers } from '../routes/bloggers';
import { Post } from './../routes/posts';
import { client, postsCollection } from './db';


export const postsRepository = {
  async findPosts(title: string | null | undefined): Promise<Post[]> {
    if (title) {
      return postsCollection.find({ title: { $regex: title } }).toArray();
    } else {
      return postsCollection.find({}).toArray();
    }
  },

  async findPostById(id: number): Promise<Post | null> {
    const post = await postsCollection.findOne({ id: id });
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
    const post = await postsCollection.insertOne(newPost);

    return newPost;
  },

  async updatePost(
    id: number,
    title: string,
    content: string,
    bloggerId: number
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
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
    const result = await postsCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
