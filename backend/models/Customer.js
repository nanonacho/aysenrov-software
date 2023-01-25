const Sequelize = require("sequelize")
const pg = require("../config/pg")

const Customer = pg.define("customer", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    entry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

module.exports = Customer