import jwt from 'jsonwebtoken';
import * as tweetService from './tweet.service.js';

export const getTweets = async (request, response, next) => {
  try {
    return response.json(await tweetService.getTweets());
  } catch (error) {
    next(error);
  }
};

export const postTweet = async (request, response, next) => {
  try {
    const user = await jwt.verify(request.cookies.access_token, process.env.JWT_SECRET).email;
    return response.json(await tweetService.postTweet(user, request.body));
  } catch (error) {
    next(error);
  }
};
