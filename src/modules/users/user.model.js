import ShortUniqueId from 'short-unique-id';
import db from '../../config/database.js';

const uid = new ShortUniqueId({ length: 5 });

export const createUser = async (user) => (
  await db.query('INSERT INTO users (user_id, username, email, password, verification_code, verified, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
    uid(),
    user.username,
    user.email,
    user.password,
    user.verification_code,
    user.verified,
    user.description,
  ])).rows[0];

export const updateUser = async (user) => (
  await db.query('UPDATE users SET username = $1, email = $2, password = $3, verification_code = $4, verified = $5, description = $6 WHERE user_id = $7 RETURNING *', [
    user.username,
    user.email,
    user.password,
    user.verification_code,
    user.verified,
    user.description,
  ])).rows[0];
