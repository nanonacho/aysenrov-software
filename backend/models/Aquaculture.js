const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Customer = require("../models/Customer")

const Aquaculture = pg.define("aquaculture", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Customer.hasOne(Aquaculture, {
    foreignKey: {
        name: "customer_id",
        allowNull: false
    }
  })

Aquaculture.belongsTo(Customer, {
    foreignKey: {
        name: "customer_id",
        allowNull: false
    }
  })

module.exports = CustomerEmployee