const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Product = require("../models/Product")
const Aquaculture = require("../models/Aquaculture")

const Item = pg.define("item", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    condition: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Product.hasOne(Item, {
    foreignKey: {
        name: "product_id",
        allowNull: false
    }
  })

Item.belongsTo(Product, {
    foreignKey: {
        name: "product_id",
        allowNull: false
    }
  })

Aquaculture.hasOne(Item, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })

Item.belongsTo(Aquaculture, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })
module.exports = Item