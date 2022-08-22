import db from '../../config/database.js';

export const getTweets = async () => (
  await db.query('SELECT * FROM tweets')).rows;

export const postTweet = async (tweet) => (
  await db.query('INSERT INTO tweets (user_id, title, body) VALUES ($1, $2, $3) RETURNING *', [
    tweet.user_id,
    tweet.title,
    tweet.body,
  ])).rows[0];
