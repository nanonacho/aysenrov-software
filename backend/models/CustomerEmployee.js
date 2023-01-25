const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Customer = require("../models/Customer")

const CustomerEmployee = pg.define("customer_employee", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rut: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

Customer.hasOne(CustomerEmployee, {
    foreignKey: {
        name: "customer_id",
        allowNull: false
    }
  })

CustomerEmployee.belongsTo(Customer, {
    foreignKey: {
        name: "customer_id",
        allowNull: false
    }
  })

module.exports = CustomerEmployee