import { Bloggers } from './../routes/bloggers';
import Router from 'express';
import { pathToFileURL } from 'url';
import { basicAuth } from '../helpers';
import { bloggers } from '../routes/bloggers';
import { Post } from './../routes/posts';
import { bloggersCollection, client } from './db';



export const bloggersRepository = {
  async findBloggers(
    title: string | null | undefined,
    pageNumber?: number,
    pageSize?: number
  ): Promise<Bloggers[]> {
    if (title) {
      return bloggersCollection.find({ title: { $regex: title } }).toArray();
    } else {
      return client
        .db('blog')
        .collection<Bloggers>('bloggers')
        .find({})
        .toArray();
    }
  },

  async findBloggerById(id: number): Promise<Bloggers | null> {
    const blogger = await bloggersCollection.findOne({ id: id });
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
    const blogger = await bloggersCollection.insertOne(newBlogger);

    return newBlogger;
  },

  async updateBlogger(
    id: number,
    name: string,
    youtubeUrl: string
  ): Promise<boolean> {
    const result = await bloggersCollection.updateOne(
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
    const result = await bloggersCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};
