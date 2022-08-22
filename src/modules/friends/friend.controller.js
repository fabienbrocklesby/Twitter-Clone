import jwt from 'jsonwebtoken';

import * as friendService from './friend.service.js';

export const sendRequest = async (request, response, next) => {
  try {
    const user_a = await jwt.verify(request.cookies.access_token, process.env.JWT_SECRET).email;
    return response.json(await friendService.sendRequest(user_a, request.body.user_b));
  } catch (error) {
    next(error);
  }
};

export const getRequests = async (request, response, next) => {
  try {
    const user_a = await jwt.verify(request.cookies.access_token, process.env.JWT_SECRET).email;
    return response.json(await friendService.getRequests(user_a));
  } catch (error) {
    next(error);
  }
};
