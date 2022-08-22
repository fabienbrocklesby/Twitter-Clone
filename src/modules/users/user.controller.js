import * as userService from './user.service.js';

export const indexUsers = async (request, response, next) => {
  try {
    response.json(await userService.indexUsers());
  } catch (error) {
    next(error);
  }
};

export const findUserById = async (request, response, next) => {
  try {
    response.json(await userService.findUserById(request.params.userId));
  } catch (error) {
    next(error);
  }
};

export const findUserByEmail = async (request, response, next) => {
  try {
    response.json(await userService.findUserByEmail(request.body.email));
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (request, response, next) => {
  try {
    response.json(await userService.createUser(request.body));
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (request, response, next) => {
  try {
    response.json(await userService.verifyUser(request.body));
  } catch (error) {
    next(error);
  }
};

export const updateUserEmail = async (request, response, next) => {
  try {
    response.json(await userService.updateUserEmail(request.body));
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (request, response, next) => {
  try {
    response.json(await userService.updateUserPassword(request.body));
  } catch (error) {
    next(error);
  }
};
