const express = require("express");
const bodyParser = require("body-parser");
const jwt= require("jsonwebtoken");
const app = express();
var cors = require('cors')
app.use(express.json());
const sql = require("./app/config/db.js");
process.env.SECRET_KEY="thisismysecretkey";

app.post("/api/login", (req, res ,next) => {
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
					  var username = 'guest_'+(row.length+1);
					  var insert = "insert  into users (name ,username ,phone ,status ,verified ) value ('"+username+"','"+username+"','"+req.body.phone+"',1,1)";
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


app.get("/api/stickers", (req, res ,next) => {
	  
	   
       const pql = "select * from stickers ";
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				res.json({status:'success',message:"stickers", data:row});
			  }
		});
   
  
});

app.get("/api/clips", (req, res ,next) => {
	   var token=req.body.token || req.headers['token'];
	   var decoded = jwt.verify(token, 'secret');
       console.log(decoded.row[0].id) // bar
       const pql = "select * from clips ";
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				res.json({status:'success',message:"clips", data:row});
			  }
		});
   
  
});


app.post("/api/like-video", (req, res ,next) => {
	  
	  
	   var token=req.body.token || req.headers['token'];
	    if(!token)
	   {
		   res.json({status:'error',message:"unothorized", data:[]});
	   }
	   var decoded = jwt.verify(token, 'secret');
       const id= decoded.row[0].id;
	   
       const clip_sql = "select likes from clips where id = "+req.body.video_id;
        sql.query(clip_sql,(err,row)=>{
			  if (row.length > 0) {
				const tot = (row[0].likes+1);
				const clip_sql_update =  "update clips set likes = "+tot+" where id = "+req.body.video_id;
				sql.query(clip_sql_update,(err,rows)=>{
					
				});
				res.json({status:'success',message:"video like", data:[]});
			  }
		});
   
  
});

app.post("/api/view-video", (req, res ,next) => {
	  
	  
	   var token=req.body.token || req.headers['token'];
	    if(!token)
	   {
		   res.json({status:'error',message:"unothorized", data:[]});
	   }
	   var decoded = jwt.verify(token, 'secret');
       const id= decoded.row[0].id;
	   
       const clip_sql = "select views from clips where id = "+req.body.video_id;
        sql.query(clip_sql,(err,row)=>{
			  if (row.length > 0) {
				const tot = (row[0].views+1);
				const clip_sql_update =  "update clips set views = "+tot+" where id = "+req.body.video_id;
				sql.query(clip_sql_update,(err,rows)=>{
					
				});
				res.json({status:'success',message:"video views", data:[]});
			  }
		});
   
  
});


app.post("/api/like-profile", (req, res ,next) => {
	  
	  
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
			  }
		});
   
  
});





app.listen(3000);