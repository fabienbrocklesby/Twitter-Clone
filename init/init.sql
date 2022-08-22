CREATE TABLE users (
  user_id VARCHAR(10) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  verification_code VARCHAR(255),
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  description VARCHAR(255),
  PRIMARY KEY (user_id)
);

CREATE TABLE friends (
  friends_id SERIAL NOT NULL,
  user_a VARCHAR(10) NOT NULL,
  user_b VARCHAR(10) NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (friends_id)
);

CREATE TABLE tweets (
  tweet_id SERIAL NOT NULL,
  user_id VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body VARCHAR(255) NOT NULL,
  PRIMARY KEY (tweet_id)
);
