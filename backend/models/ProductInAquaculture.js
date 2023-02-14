const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Product = require("../models/Product")
const Aquaculture = require("../models/Aquaculture")

const ProductInAquaculture = pg.define("product_in_aquaculture", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
})

Product.hasMany(ProductInAquaculture, {
    foreignKey: {
        name: "product_id",
        allowNull: false
    }
  })

ProductInAquaculture.belongsTo(Product, {
    foreignKey: {
        name: "product_id",
        allowNull: false
    }
  })

Aquaculture.hasMany(ProductInAquaculture, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })

ProductInAquaculture.belongsTo(Aquaculture, {
    foreignKey: {
        name: "aquaculture_id",
        allowNull: false
    }
  })  

module.exports = ProductInAquaculture