export default {
  development: {
    client: "mysql2",
    version: "8.0",
    connection: {
      host: "localhost",
      user: "root",
      password: "password",
      database: "employees",
    },
  },
  production: {
    client: "mysql2",
    version: "8.0",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
  test:{
    client: 'sqlite3',
		connection: { filename: ':memory:' },
		useNullAsDefault: true,
  }
};

