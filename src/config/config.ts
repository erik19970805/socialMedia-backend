const { env } = process;

export const db: string = env.MONGODB_URL ? env.MONGODB_URL : 'mongodb://localhost/social-media';
export const token = {
  accessToken: env.ACCESS_TOKEN ? env.ACCESS_TOKEN : 'secret',
  refreshToken: env.REFRESH_TOKEN ? env.REFRESH_TOKEN : 'secret2',
};
