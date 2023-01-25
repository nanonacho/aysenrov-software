const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Employee = require("../models/Employee")

const Contract = pg.define("contract", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    base_salary: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    afp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salud: {
        type: Sequelize.STRING,
        allowNull: false
    },
    signature_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

Employee.hasOne(Contract, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

Contract.belongsTo(Employee, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

module.exports = Contract