const express = require("express");
const bodyParser = require("body-parser");
const jwt= require("jsonwebtoken");
const app = express();
app.use(express.json());
const sql = require("../config/db.js");
const routes = require('express').Router();
const bcrypt = require("bcryptjs");
const cors = require('cors');
app.use(cors());

routes.post("/like-profile", (req, res ,next) => {
	  
	  
	   var token=req.body.token || req.headers['token'];
	   if(!token)
	   {
		   res.json({status:'error',message:"unothorized", data:[]});
	   }
	   var decoded = jwt.verify(token, 'secret');
	   
       const id= decoded.row[0].id;
	   
       const clip_sql = "select likesCount from users where id = "+req.body.user_id;

        sql.query(clip_sql,(err,row)=>{
			  if (row.length > 0) {
				const tot = (row[0].likesCount+1);
				const clip_sql_update =  "update users set likesCount = "+tot+" where id = "+req.body.user_id;
				sql.query(clip_sql_update,(err,rows)=>{
					
				});
				res.json({status:'success',message:"profile like", data:[]});
			  }else{
				  res.json({status:'success',message:"no record", data:[]});
			  }
		});
   
  
});


module.exports = routes;
