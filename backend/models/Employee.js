const Sequelize = require("sequelize")
const pg = require("../config/pg")

const Employee = pg.define("employee", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    entry_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    afp: {
        type: Sequelize.STRING,
        allowNull: true
    },
    salud: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bank: {
        type: Sequelize.STRING,
        allowNull: true
    },
    account_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    account: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Employee