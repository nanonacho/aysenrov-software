const Sequelize = require("sequelize")
const pg = require("../config/pg")
const Category = require("../models/Category")

const Product = pg.define("product", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.hasOne(Product, {
    foreignKey: {
        name: "category_id",
        allowNull: false
    }
  })

Product.belongsTo(Category, {
    foreignKey: {
        name: "category_id",
        allowNull: false
    }
  })

module.exports = Product