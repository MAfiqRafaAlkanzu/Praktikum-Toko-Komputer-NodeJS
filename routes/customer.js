const express = require("express");
const app = express();
app.use(express.json());

const md5 = require("md5");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// import model
const models = require ("../models/index");
const res = require("express/lib/response");
const customer = models.customer

// Config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, "./images/customer")
},
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

// Get all customer, METHOD: GET, Function: findAll
app.get("/", (req,res) =>{
    customer.findAll()
    .then(result => {
        res.json({
            customer: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// Get Customer By ID
app.get("/:customer_id", (req, res) =>{
    customer.findOne({ where: {customer_id: req.params.customer_id}})
    .then(result => {
        res.json({
            customer: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


// Post Customer
app.post("/", upload.single("image"), (req, res) =>{
    if(!req.file){
        res.json({
            message: "No Uploaded File"
        })
    } else {
        let data = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            image: req.file.filename,
            username: req.body.username,
            password: md5(req.body.password)
        }
        customer.create(data)
        .then(result =>{
            res.json({
                message: "Data has been inserted"
            })
        })
        .catch(error =>{
            res.json({
                message: error.message
            })
        })
    }
})
module.exports = app