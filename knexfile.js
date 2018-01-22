// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres://wjiugcpmwkkbsk:666402e4b8e6f0d22f617aac1c221959b7d55a610b37e694bb0a1a9b33e06671@ec2-46-137-174-67.eu-west-1.compute.amazonaws.com:5432/dfdms41acr35sl',
      user:     'wjiugcpmwkkbsk',
      password: '666402e4b8e6f0d22f617aac1c221959b7d55a610b37e694bb0a1a9b33e06671'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres://wjiugcpmwkkbsk:666402e4b8e6f0d22f617aac1c221959b7d55a610b37e694bb0a1a9b33e06671@ec2-46-137-174-67.eu-west-1.compute.amazonaws.com:5432/dfdms41acr35sl',
      user:     'wjiugcpmwkkbsk',
      password: '666402e4b8e6f0d22f617aac1c221959b7d55a610b37e694bb0a1a9b33e06671'
    },
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
