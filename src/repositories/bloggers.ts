import { Bloggers } from './../routes/bloggers';
import Router from 'express';
import { pathToFileURL } from 'url';
import { basicAuth } from '../helpers';
import { bloggers } from '../routes/bloggers';
import { Post } from './../routes/posts';
import { client } from './db';

export const bloggersRepository = {
  async findBloggers(title: string | null | undefined): Promise<Bloggers[]> {
    if (title) {
      return client
        .db('blog')
        .collection<Bloggers>('bloggers')
        .find({ title: { $regex: title } })
        .toArray();
    } else {
      return client
        .db('blog')
        .collection<Bloggers>('bloggers')
        .find({})
        .toArray();
    }
  },

  async findBloggersWithPagination(id:number,
    skipQuantity: number,
    pageSize: number
  ): Promise<Bloggers[]> {
    return client
      .db('blog')
      .collection<Bloggers>('bloggers')
      .find({id: id})
      .skip(skipQuantity)
      .limit(pageSize)
      .toArray();
  },
  
  async getQuantityPostsOfBlogger(id: number){
    return client
    .db('blog')
    .collection<Bloggers>('bloggers')
    .count({id: id})
  },

  async findBloggerById(id: number): Promise<Bloggers | null> {
    const blogger = await client
      .db('blog')
      .collection<Bloggers>('bloggers')
      .findOne({ id: id });
    if (blogger) {
      return blogger;
    } else {
      return null;
    }
  },

  async createBlogger(name: string, youtubeUrl: string): Promise<Bloggers> {
    const newBlogger = {
      id: +new Date(),
      name,
      youtubeUrl,
    };
    const blogger = await client
      .db('blog')
      .collection<Bloggers>('bloggers')
      .insertOne(newBlogger);

    return newBlogger;
  },

  async updateBlogger(
    id: number,
    name: string,
    youtubeUrl: string
  ): Promise<boolean> {
    const result = await client
      .db('blog')
      .collection<Bloggers>('bloggers')
      .updateOne(
        { id: id },
        {
          $set: {
            name: name,
            youtubeUrl: youtubeUrl,
          },
        }
      );

    return result.matchedCount === 1;
  },

  async deleteBloggers(id: number): Promise<boolean> {
    const result = await client
      .db('blog')
      .collection<Bloggers>('bloggers')
      .deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
