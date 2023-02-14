const Sequelize = require("sequelize")
const pg = require("../config/pg")

const Supplier = pg.define("supplier", {
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
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    entry_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Supplier