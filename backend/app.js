const express = require("express")
const pg = require("./config/pg")
const mongoose = require("mongoose")
const cors = require("cors")

require('dotenv').config()

// Import routes
const user = require("./routes/user")
const auth = require("./routes/auth")
const employee = require("./routes/employee")
const employeeReport = require("./routes/employeeReport")
const contract = require("./routes/contract")
const product = require("./routes/product")
const category = require("./routes/category")
const customer = require("./routes/customer")
const customerEmployee = require("./routes/customerEmployee")
const productInAquaculture = require("./routes/productInAquaculture")
const employeeInAquaculture = require("./routes/employeeInAquaculture")
const aquaculture = require("./routes/aquaculture")
const item = require("./routes/item")
const supplier = require("./routes/supplier")
const purcharseType = require("./routes/purcharseType")
const purcharseOrder = require("./routes/purcharseOrder")
const purcharseLine = require("./routes/purcharseLine")

// Import middlewares
//const verifytoken = require("./middlewares/validate-token")

// Connect to mongo and postgres, then the server was open
const mongoDB = process.env.URL
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    const port = process.env.PORT || 4000;

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Routes
    app.use("/user", user)
    app.use("/auth", auth)
    app.use("/employee", employee)
    app.use("/employee-report", employeeReport)
    app.use("/contract", contract)
    app.use("/product", product)
    app.use("/category", category)
    app.use("/customer", customer)
    app.use("/customer-employee", customerEmployee)
    app.use("/product-in-aquaculture", productInAquaculture)
    app.use("/employee-in-aquaculture", employeeInAquaculture)
    app.use("/aquaculture", aquaculture)
    app.use("/item", item)
    app.use("/supplier", supplier)
    app.use("/purcharse-type", purcharseType)
    app.use("/purcharse-order", purcharseOrder)
    app.use("/purcharse-line", purcharseLine)

    // Connect to pg and open server
    pg.sync().then(() => {
      pg.authenticate().then(() => console.log("Conexión postgres exitosa ")).catch("Conexión postgres fallida")
      app.listen(port, () =>
      console.log(`Server running on port ${port}, http://localhost:${port}`)
      )
    })
  })



