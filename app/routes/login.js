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

routes.get("/", (req, res ,next) => {    
 res.json({status:'success',message:"Server run", data:[]});
});



routes.post("/login", (req, res ,next) => {
   if(req.body.phone==''){
	    res.json({status:'success',message:"phone number required",data:[]});
   }else{ 
       var pql = "select * from users where phone =  "+req.body.phone;
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				const token = jwt.sign({row}, 'secret', { expiresIn: 60 * 60 });
  
				res.json({status:'success',message:"login successfully", access_token : token,token_type:'bearer', data:row});
			  }else{
				  var rql = "select * from users ";
				  sql.query(rql,(err,row)=>{
					  const password = bcrypt.hashSync(req.body.phone, 8)
					  var username = 'guest_'+(row.length+1);
					  
					  var insert = "insert  into users (name ,username ,password,phone  ,status ,verified ) value ('"+username+"','"+username+"','"+password+"','"+req.body.phone+"',1,1)";
					  sql.query(insert,(err,row)=>{
						  var qql = "select * from users where phone =  "+req.body.phone;
						  sql.query(qql,(err,rows)=>{
							  const token = jwt.sign({rows}, 'secret', { expiresIn: 60 * 60 });
							res.json({status:'success',message:"login successfully", access_token : token,token_type:'bearer', data:rows});
						  });
						  
						  
					  });
				  });
			  }
		});
   }
  
});

routes.post("/login-password", (req, res ,next) => {
   if(req.body.phone==''){
	    res.json({status:'success',message:"phone number required",data:[]});
   }
   else if(req.body.password==''){
	    res.json({status:'success',message:"Password required",data:[]});
   }
   else{ 
       var pql = "select * from users where phone =  "+req.body.phone;
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				  
				  var passwordIsValid = bcrypt.compareSync(
					req.body.password,
					row[0].password
				  );
				  if (!passwordIsValid) {
					
					res.json({status:'error',message:"Invaild password",access_token : null,data:[]});
				  }else{
					  const token = jwt.sign({row}, 'secret', { expiresIn: 60 * 60 });
					  res.json({status:'success',message:"login successfully",access_token : token,data:row});
				  }
				  
				
  
				
			  }else{
				  
				res.json({status:'error',message:"You are not register with us",  data:[]});
						  
			  }
		});
   }
  
});



module.exports = routes;
