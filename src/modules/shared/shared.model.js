import db from '../../config/database.js';

export const indexUsers = async () => (
  await db.query('SELECT * FROM users')).rows;

export const selectUserById = async (user_id) => (
  await db.query('SELECT * FROM users WHERE user_id = $1', [user_id])).rows[0];

export const selectUserByEmail = async (email) => (
  await db.query('SELECT * FROM users WHERE email = $1', [email])).rows[0];

export const selectUserByUsername = async (username) => (
  await db.query('SELECT * FROM users WHERE username = $1', [username])).rows[0];
