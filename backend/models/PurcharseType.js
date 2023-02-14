const Sequelize = require("sequelize")
const pg = require("../config/pg")

const PurcharseType = pg.define("purcharse_type", {
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

module.exports = PurcharseType