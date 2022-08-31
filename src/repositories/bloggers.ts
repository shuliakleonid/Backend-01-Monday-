import { Bloggers } from './../routes/bloggers';
import { bloggersCollection, client } from './db';

export const bloggersRepository = {
  async findBloggers(title: string | null | undefined): Promise<Bloggers[]> {
    if (title) {
      return bloggersCollection
        .find(
          { title: { $regex: title } },
          {
            projection: { _id: 0 },
          }
        )
        .toArray();
    } else {
      return bloggersCollection
        .find(
          {},
          {
            projection: { _id: 0 },
          }
        )
        .toArray();
    }
  },

  async findBloggerById(id: number): Promise<Bloggers | null> {
    const blogger = await bloggersCollection.findOne(
      { id: id },
      {
        projection: { _id: 0 },
      }
    );
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
    await bloggersCollection.insertOne(newBlogger);

    // @ts-ignore
    delete newBlogger._id;
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
