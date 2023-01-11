const { Sequelize } = require('sequelize')

const pg = new Sequelize("postgres://postgres:v1aq1wcVP5OZBl8@localhost:5432")
module.exports = pg