const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Employee = require("../models/Employee")
const Aquaculture = require("../models/Aquaculture")

const EmployeeInAquaculture = pg.define("employee_in_aquaculture", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
})

Employee.hasMany(EmployeeInAquaculture, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

EmployeeInAquaculture.belongsTo(Employee, {
    foreignKey: {
        name: "employee_id",
        allowNull: false
    }
  })

Aquaculture.hasMany(EmployeeInAquaculture, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })

EmployeeInAquaculture.belongsTo(Aquaculture, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })  

module.exports = EmployeeInAquaculture