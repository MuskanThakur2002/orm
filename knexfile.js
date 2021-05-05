// Update with your config settings.

module.exports = {


  development: {
    client: 'postgresql',
    connection: {
      database: 'orm',
      user:     'postgres',
      password: 'muskan@123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
