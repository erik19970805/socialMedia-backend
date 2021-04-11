const { env } = process;

export const db: string = env.MONGODB_URL ? env.MONGODB_URL : 'mongodb://localhost/social-media';

export default {
  db,
};
