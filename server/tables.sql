CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE ,
  hashed_password VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  joined_at TIMESTAMP NOT NULL,
  about VARCHAR,
  location VARCHAR,
  portfolio VARCHAR,
  github VARCHAR
);

CREATE TABLE questions (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(70) NOT NULL,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NULL,
  tags TEXT[],
  upvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  downvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  views INT DEFAULT 0,

  search_vectors TSVECTOR NOT NULL
);
CREATE TABLE answers (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NULL,
  upvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  downvoted_by TEXT[] DEFAULT array[]::VARCHAR[]
);
CREATE TABLE comments (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  answer_id VARCHAR REFERENCES answers(id) ON DELETE CASCADE,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT NULL
);

