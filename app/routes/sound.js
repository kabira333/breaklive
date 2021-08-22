const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const sql = require("../config/db.js");
const routes = require('express').Router();
var cors = require('cors');
app.use(cors());
routes.get("/sounds", (req, res ,next) => {
	  
	   
       const pql = "select id,title,file from sounds ";
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				res.json({status:'success',url:'',message:"sounds", data:row});
			  }else{
				  res.json({status:'success',message:"no record", data:[]});
			  }
		});
    
  
});

module.exports = routes;
