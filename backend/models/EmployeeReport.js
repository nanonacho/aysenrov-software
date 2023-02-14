const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Employee = require("../models/Employee")

const EmployeeReport = pg.define("employee_report", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Employee.hasMany(EmployeeReport, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

EmployeeReport.belongsTo(Employee, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

module.exports = EmployeeReport