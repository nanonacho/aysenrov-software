const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Product = require("./Product")
const PurcharseOrder = require("./PurcharseOrder")

const PurcharseLine = pg.define("purcharse_line", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unit_price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

PurcharseOrder.hasMany(PurcharseLine, {
    foreignKey: {
        name: "order_id",
        allowNull: false
    }
  })

  PurcharseLine.belongsTo(PurcharseOrder, {
    foreignKey: {
        name: "order_id",
        allowNull: false
    }
  })  

  Product.hasMany(PurcharseLine, {
    foreignKey: {
        name: "product_id",
        allowNull: true
    }
  })

  PurcharseLine.belongsTo(Product, {
    foreignKey: {
        name: "product_id",
        allowNull: true
    }
  })  

module.exports = PurcharseLine