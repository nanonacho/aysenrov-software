const Sequelize = require("sequelize")
const pg = require("../config/pg")

const Category = pg.define("category", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Category