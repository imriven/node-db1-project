const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

const middlewares = [checkQueryOrder]
// server.get("/accounts", (req, res)=> {
//     db("accounts")
//     .then(results => res.status(200).json(results))
//     .catch(err => res.status(500).send())
// }) 

server.get("/accounts/:id", (req, res)=> {
    db("accounts").where({ id: req.params.id })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send())
})

server.post("/accounts", (req, res)=> {
    db("accounts").insert(req.body)
    .then(results => res.status(201).send())
    .catch(err => res.status(500).send())
}) 

server.put("/accounts/:id", (req, res)=> {
    db("accounts").where({id: req.params.id})
    .update(req.body)
    .then(results => res.status(201).send())
    .catch(err => res.status(500).send())
}) 

server.delete("/accounts/:id", (req, res)=> {
    db("accounts").where({id: req.params.id}).del()
    .then(results => res.status(204).send())
    .catch(err => res.status(500).send())
}) 

// Stretch

server.get("/accounts", ...middlewares, (req, res)=> {
     
    db("accounts").where("budget", "<", req.query.max).orderBy("budget", req.query.order).limit(req.query.limit)
    .then(results => {
        res.status(200).json(results)
       })
    .catch(err => res.status(500).send())
})

function checkQueryOrder (req, res, next) {
    const goodValues = ["desc", "asc"]
    if (!goodValues.includes(req.query.order)) {
        req.query.order = "desc"
         } 
         next();
}



//ocalhost:5000/accounts?limit=3&order=desc&max=5000

module.exports = server;
