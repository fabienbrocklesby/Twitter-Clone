import db from '../../config/database.js';

export const sendRequest = async (user_a, user_b) => (
  db.query('INSERT INTO friends (user_a, user_b, status) VALUES ($1, $2, $3) RETURNING *', [user_a, user_b, 'pending'])).rows;

export const getRequests = async (user_a) => (
  await db.query('SELECT * FROM friends WHERE user_b = $1 AND status = $2', [user_a, 'pending'])).rows;
