const express = require("express");
const bodyParser = require("body-parser");
const jwt= require("jsonwebtoken");
const app = express();
app.use(express.json());
const sql = require("../config/db.js");
const routes = require('express').Router();
const cors = require('cors');
app.use(cors());


routes.get("/clips", (req, res ,next) => {
	const token=req.body.token || req.headers['token'];
    const pql = "select * from clips ";
        sql.query(pql,(err,row)=>{
			if (row.length > 0) {
				res.json({status:'success',message:"clips", data:row});
			}else{
				res.json({status:'success',message:"no record found", data:[]});
			}
	});
   
});


routes.post("/like-clips", (req, res ,next) => {
	const token=req.body.token || req.headers['token'];
	const decoded = jwt.verify(token, 'secret');
    const id= decoded.row[0].id;
	const clip_sql = "select likes from clips where id = "+req.body.video_id;
        sql.query(clip_sql,(err,row)=>{
			if (row.length > 0) {
				const tot = (row[0].likes+1);
				const clip_sql_update =  "update clips set likes = "+tot+" where id = "+req.body.video_id;
					sql.query(clip_sql_update,(err,rows)=>{
				});
					res.json({status:'success',message:"video like", data:[]});
			}else{
					res.json({status:'success',message:"no record", data:[]});
			}
	});
});

routes.post("/view-clips", (req, res ,next) => {
	const token=req.body.token || req.headers['token'];
	const decoded = jwt.verify(token, 'secret');
    const id= decoded.row[0].id;
    const clip_sql = "select views from clips where id = "+req.body.video_id;
    sql.query(clip_sql,(err,row)=>{
		if (row.length > 0) {
			const tot = (row[0].views+1);
			const clip_sql_update =  "update clips set views = "+tot+" where id = "+req.body.video_id;
			sql.query(clip_sql_update,(err,rows)=>{
				
			});
			res.json({status:'success',message:"video views", data:[]});
		}else{
			res.json({status:'success',url:'',message:"no record", data:[]});
		}
	});
});


module.exports = routes;
