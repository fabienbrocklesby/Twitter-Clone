import * as sharedModel from '../shared/shared.model.js';
import * as tweetModel from './tweet.model.js';

import postValidator from '../../validators/post.validator.js';

export const getTweets = async () => (
  tweetModel.getTweets());

export const postTweet = async (user, { title, body }) => {
  await postValidator({ title, body }, ['title', 'body']);
  const { user_id } = await sharedModel.selectUserByEmail(user);

  return tweetModel.postTweet({ user_id, title, body });
};
