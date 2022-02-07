// Import
const express = require("express")
const cors = require("cors")

// Implementasi
const app = express()
app.use(cors())

// Endpoint Admin
const admin = require("./routes/admin");
app.use("/admin", admin)

// Endpoint Customer
const customer = require("./routes/customer");
app.use("/customer", customer)

// Run Server
app.listen(8080, () => {
    console.log("Server run on port 8080")
})