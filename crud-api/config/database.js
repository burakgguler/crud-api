var pg = require('pg');
pg.defaults.ssl = true;

const { Sequelize } = require('sequelize');
module.exports = new Sequelize('df91o7rmukocc', 'unnrescsymnkcf', 
    'f4ee9dcd3a10c872e6d76a5a32e3f43c644c53111aa3284928e50c926b908862', {
    host: 'ec2-23-23-128-222.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
  });