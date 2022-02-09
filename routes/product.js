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
const product = models.product

// Config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, "./images/product")
},
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

// Get all Product, METHOD: GET, Function: findAll
app.get("/", (req,res) =>{
    product.findAll()
    .then(result => {
        res.json({
            product: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// Get Product By ID
app.get("/:product_id", (req, res) =>{
    product.findOne({ where: {product_id: req.params.product_id}})
    .then(result => {
        res.json({
            product: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


// Post Product
app.post("/", upload.single("image"), (req, res) =>{
    if(!req.file){
        res.json({
            message: "No Uploaded File"
        })
    } else {
        let data = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stoct,
            image: req.file.filename  
        }
        product.create(data)
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