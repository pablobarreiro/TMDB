const Sequelize = require('sequelize');

const db = new Sequelize('tmdb', null, null, {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = db