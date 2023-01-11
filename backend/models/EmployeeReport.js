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
        type: Sequelize.DATE,
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

Employee.hasOne(EmployeeReport, {
    foreignKey: "employee_id"
  })

EmployeeReport.belongsTo(Employee, {
    foreignKey: "employee_id"
  })

module.exports = EmployeeReport