const express = require("express");
const bodyParser =require("body-parser");
const md5 = require("md5");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// import model
const model = require("../models/index.js");
const res = require("express/lib/response");
const admin = model.admin;

// endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    admin.findAll()
        .then(admin => {
            res.json(admin)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// endpoint utk menyimpan data admin METHOD: POST, function: CREATE
app.post("/", (req,res) => {
    let data ={
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.create(data)
        .then(result =>{
            res.json({
            message : "Data has been inserted"
            })
        })
        .catch(error =>{
            message : error.message
        })
})

// endpoint utk mengubah data admin METHOD: PUT, function: UPDATE
app.put("/:id", (req,res) =>{   
    let param = {
        admin_id : req.params.id
    }
    let data ={
        name : req.body.name,
        username : req.body.username,
        password : md5(req.body.password)
    }
    admin.update(data, {where: param})
        .then(result =>{
            res.json({
                message: "Data has been updated"
            })
        })
        .catch(error =>{
            res.json({
            message: error.message
            })
        })
})

// endpoint utk menghapus data admin METHOD: DELETE, function: Destroy
app.delete("/:id" , (req,res) =>{
    let param = {
        admin_id : req.params.id
    }
    admin.destroy({where: param})
    .then(result =>{
        res.json({
            message: "Data has been deleted"
        })
    })
    .catch(error =>{
        res.json({
        message: error.message
        })
    })
})

module.exports = app;