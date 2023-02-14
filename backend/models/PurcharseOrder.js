const Sequelize = require("sequelize")
const pg = require("../config/pg")
const PurcharseType = require("./PurcharseType")
const Supplier = require("./Supplier")

const PurcharseOrder = pg.define("purcharse_order", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

Supplier.hasMany(PurcharseOrder, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false
    }
  })

PurcharseOrder.belongsTo(Supplier, {
    foreignKey: {
        name: "supplier_id",
        allowNull: false
    }
  })  

PurcharseType.hasMany(PurcharseOrder, {
    foreignKey: {
        name: "type_id",
        allowNull: false
    }
  })

PurcharseOrder.belongsTo(PurcharseType, {
    foreignKey: {
        name: "type_id",
        allowNull: false
    }
  })  

module.exports = PurcharseOrder