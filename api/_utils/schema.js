const createTablesQuery = `
  DROP TABLE IF EXISTS chat_history;
  DROP TABLE IF EXISTS chat_sessions;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
      email VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE chat_sessions (
      id SERIAL PRIMARY KEY,
      user_email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE chat_history (
      id SERIAL PRIMARY KEY,
      user_email VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      session_id INTEGER NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
      message TEXT,
      sender VARCHAR(50),
      file_url TEXT[],
      file_type TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

module.exports = {
  createTablesQuery,
};
