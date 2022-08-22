import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { selectUserByEmail } from '../shared/shared.model.js';

import userValidator from '../../validators/user.validator.js';

export default async ({ email, password }) => {
  await userValidator({ email, password });

  const user = await selectUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.verified) {
    throw new Error('User not verified');
  }

  if (!await bcrypt.compare(password, user.password)) {
    throw new Error('Password is invalid ..');
  }

  const token = jwt.sign({ user_id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  return token;
};
