app.post("/login", (req, res ,next) => {



   if(req.body.phone==''){
	    res.json({status:'success',message:"phone number required",data:[]});
   }else{ 
       var pql = "select * from users where phone =  "+req.body.phone;
        sql.query(pql,(err,row)=>{
			  if (row.length > 0) {
				res.json({status:'success',message:"login successfully", access_token : '',token_type:'bearer', data:row});
			  }else{
				  var rql = "select * from users ";
				  sql.query(rql,(err,row)=>{
					  var username = 'guest_'+(row.length+1);
					  var insert = "insert  into users (name ,username ,phone ,status ,verified ) value ('"+username+"','"+username+"','"+req.body.phone+"',1,1)";
					  sql.query(insert,(err,row)=>{
						  var qql = "select * from users where phone =  "+req.body.phone;
						  sql.query(qql,(err,rows)=>{
							res.json({status:'success',message:"login successfully", access_token : '',token_type:'bearer', data:rows});
						  });
						  
						  
					  });
				  });
			  }
		});
   }
  
});