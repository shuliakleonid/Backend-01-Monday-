import { Post } from './../routes/posts';
import { client, postsCollection } from './db';


export const postsRepository = {
  async findPosts(title: string | null | undefined): Promise<Post[]> {
    if (title) {
      return postsCollection
        .find({ title: { $regex: title } })
        .toArray();
    } else {
      return postsCollection.find({}).toArray();

    }
  },

  async findPostById(id: number): Promise<Post | null> {

    const post = await postsCollection
      .findOne(
        { id: id },
        {
          projection: { _id: 0 },
        }
      );
    if (post) {
      return post;
    } else {postsCollection
      return null;
    }
  },

  async findPostsBloggersWithPagination(
    id: number,
    skipQuantity: number,
    pageSize: number
  ): Promise<Post[] | null> {
    const posts = await postsCollection
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

  async getQuantityPostsOfBlogger(id: number):Promise<number> {
    return postsCollection.count({ id: id });
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

    const post = await postsCollection
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
