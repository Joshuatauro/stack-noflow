CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(20) NOT NULL,
  email VARCHAR NOT NULL,
  hashed_password VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  joined_at TIMESTAMP NOT NULL
)

CREATE TABLE questions (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR(30) NOT NULL,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  tags TEXT[],
  upvoted_by TEXT[],
  downvoted_by TEXT[]
)

CREATE TABLE comment (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  body VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
)

CREATE TABLE answers (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  question_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  body VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  upvoted_by TEXT[],
  downvoted_by TEXT[]
)