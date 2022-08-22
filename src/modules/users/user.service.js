import bcrypt from 'bcrypt';
import ShortUniqueId from 'short-unique-id';

import * as userModel from './user.model.js';
import * as sharedModel from '../shared/shared.model.js';

import emailController from '../emails/email.controller.js';

import userValidator from '../../validators/user.validator.js';

const uid = new ShortUniqueId({ length: 6 });

export const indexUsers = async () => (
  sharedModel.indexUsers());

export const findUserById = async (userId) => (
  sharedModel.selectUserById(userId));

export const findUserByEmail = async (email) => (
  sharedModel.selectUserByEmail(email));

export const createUser = async ({
  username,
  email,
  password,
}) => {
  await userValidator({ username, email, password }, ['username', 'email', 'password']);

  if (
    await sharedModel.selectUserByEmail(email)
    || await sharedModel.selectUserByUsername(username)
  ) {
    throw new Error('User already exists ..');
  }

  const user = await userModel.createUser({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });

  await emailController(
    user.email,
    'Verify',
    `Your Verification Code: ${user.verification_code}`,
  );

  return user;
};

export const verifyUser = async ({ email, verification_code }) => {
  const user = await sharedModel.selectUserByEmail(email);

  if (!user) {
    throw new Error('User not found ..');
  }

  if (user.verification_code !== verification_code) {
    throw new Error('Verification Code is invalid ..');
  }

  user.verification_code = null;
  user.verified = true;

  await userModel.updateUser(user);

  return 'User Verified .. 😀';
};

export const updateUserEmail = async ({ originalEmail, email, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  const user = await sharedModel.selectUserByEmail(originalEmail);

  if (!user) {
    throw new Error('User not found ..');
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new Error('Password is invalid ..');
  }

  user.email = email;
  user.verified = false;
  user.verification_code = uid();

  const updatedUser = await userModel.updateUser(user);

  await emailController(
    user.email,
    'Verify',
    `Your Verification Code: ${user.verification_code}`,
  );

  return updatedUser;
};

export const updateUserPassword = async ({ email, originalPassword, password }) => {
  await userValidator({ email, password }, ['email', 'password']);

  const user = await sharedModel.selectUserByEmail(email);

  if (!user) {
    throw new Error('User not found ..');
  }

  if (!await bcrypt.compare(originalPassword, user.password)) {
    throw new Error('Password is invalid ..');
  }

  user.password = await bcrypt.hash(password, 10);
  user.verified = false;
  user.verification_code = uid();

  const updatedUser = await userModel.updateUser(user);

  await emailController(
    user.email,
    'Verify',
    `Your Verification Code: ${user.verification_code}`,
  );

  return updatedUser;
};
