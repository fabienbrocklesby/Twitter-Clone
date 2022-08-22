import db from '../../config/database.js';

export const sendRequest = async (user_a, user_b) => (
  db.query('INSERT INTO friends (user_a, user_b, status) VALUES ($1, $2, $3) RETURNING *', [user_a, user_b, 'pending'])).rows;

export const getRequests = async (user_a) => (
  await db.query('SELECT * FROM friends WHERE user_b = $1 AND status = $2', [user_a, 'pending'])).rows;

export const acceptRequest = async (user_a, user_b) => (
  await db.query('UPDATE friends SET status = $1 WHERE user_a = $2 AND user_b = $3 RETURNING *', ['accepted', user_a, user_b])).rows;
