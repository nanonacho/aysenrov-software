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

// Import middlewares
//const verifytoken = require("./middlewares/validate-token")

const mongoDB = process.env.URL
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();
    const port = process.env.PORT || 4000;

    app.use(cors())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    //routes
    app.use("/user", user)
    app.use("/auth", auth)
    app.use("/employee", employee)
    app.use("/employee-report", employeeReport)
    app.use("/contract", contract)

    //server
    pg.sync().then(() => {
      pg.authenticate().then(() => console.log("Conexión postgres exitosa ")).catch("Conexión postgres fallida")
      app.listen(port, () =>
      console.log(`Server running on port ${port}, http://localhost:${port}`)
      )
    })
    
  })



