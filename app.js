const express=require("express");
const ejs=require("ejs");
const mysql=require("mysql");
const bodyparser=require("body-parser");


const app=express();

app.use(bodyparser.urlencoded({extended:true}));

// CREATING CONNECTION DATABASE
const database=mysql.createConnection({
  host :'localhost',
  user :'root',
  password :'password',
  database :'test_db',
  port :3306
});
database.connect(function(err){
  if(err) throw err;
  console.log("Connected to database");
});


app.use(express.static("public"));
app.set("view engine" , "ejs");

// ------------------------------------------------------------------------------------ROUTES
app.get("/",function(req , res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/predict" , function(req , res){
  res.sendFile(__dirname+"/course.html");
});

app.get("/btech",function(req , res ){
  res.sendFile(__dirname+"/btech.html");
});

// ------------------------------------------------MBA-----CAT
app.get("/mba",function(req, res){
  res.render("mba");
});
app.post("/mba.table", function(req , res ){
  var score=req.body.score;
  var gender=req.body.gender;
  var category=req.body.category;
  console.log(score);
  console.log(gender);
  console.log(category);
  var name="CAT";
  var sql2="SELECT *FROM mba WHERE "+category+"<="+score+" And Gender ="+mysql.escape(gender);
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });
})
// ----------------------------------------------B. SC // DU
app.get("/bsc",function(req , res){
  res.render("bsc");
});
app.post("/bsc.table", function( req, res ){
  var percentage=req.body.percentage;
  var category=req.body.category;
  var gender=req.body.gender;
  console.log(percentage);
  console.log(category);
  console.log(gender);
  if(gender=="Female")
   var male="No";
  else
   var male="Yes";
  var name="B.SC";
  var sql2="SELECT *FROM bsc WHERE "+category+"<="+percentage+" And Man ="+mysql.escape(male);
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });
});



app.get("/mtech",function(req , res){
  res.render("mtech");
});

// ------------------------------------------------------ G A T E
// -------------------------GATE EE

app.get("/gateEE.table",function( req , res){
  res.render("gateEE");
});
app.post("/gateEE.table",function(req , res){
  var marks=req.body.marks;
  var category=req.body.category;
  console.log(marks);
  console.log(category);
  var name="Gate EE";
  var sql2="SELECT *FROM gate_ee WHERE "+category+"<="+marks;
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });

});
// -----------------------GATE ME
app.get("/gateME.table",function( req , res){
  res.render("gateME");
});
app.post("/gateME.table",function(req , res){
  var marks=req.body.marks;
  var category=req.body.category;
  console.log(marks);
  console.log(category);
  var name="Gate ME";
  var sql2="SELECT *FROM gate_me WHERE "+category+"<="+marks;
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });

});
// ----------------------GATE CS
app.get("/gateCS.table",function( req , res){
  res.render("gateCS");
});
app.post("/gateCS.table",function(req , res){
  var marks=req.body.marks;
  var category=req.body.category;
  console.log(marks);
  console.log(category);
  var name="Gate CS";
  var sql2="SELECT *FROM gate_cs WHERE "+category+"<="+marks;
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });

});
//------------------ GATE CE
app.get("/gateCE.table",function( req , res){
  res.render("gateCE");
});
app.post("/gateCE.table",function(req , res){
  var marks=req.body.marks;
  var category=req.body.category;
  console.log(marks);
  console.log(category);
  var name="Gate CE";
  var sql2="SELECT *FROM gate_ce WHERE "+category+"<="+marks;
  database.query(sql2, function(err , rows, fields){
    if(err) throw err;
    res.render("gate-table",{examname :name ,tableData:rows ,role:category});
  });

});

//------------------------------------------------ JEE ADVANCED
app.get("/jeeadvanced.html",function(req , res){
  res.render("jeeadvanced");
});
app.post("/jeeadvanced.table",function(req , res){
  var rank=req.body.rank;
  var gender=req.body.gender;
  var category=req.body.category;
  console.log(gender);
  console.log(rank);
  console.log(category);
  var name="Jee Advanced";
  var sql2="SELECT *FROM jeeadvanced WHERE "+gender+">="+rank+" AND category="+mysql.escape(category);
  database.query(sql2 , function(err , rows ,fields){
    if(err) throw err;

    res.render("table", { examname:name , tableData:rows , gen:gender});
  });
});


// --------------------------------------JAC DELHI
app.get("/jacdelhi.html",function(req , res){
  res.render("jacdelhi");
});
app.post("/jacdelhi.table",function(req , res){
  var rank=req.body.rank;
  var gender=req.body.gender;
  var category=req.body.category;
  var region=req.body.region;
  console.log(region);
  if(region=="Delhi"){
    gender="Delhi";
  }
  console.log(gender);
  console.log(rank);
  console.log(category);
  var name="JAC Delhi";
  var sql2="SELECT *FROM jac_delhi WHERE "+gender+">="+rank+" AND category="+mysql.escape(category);
  database.query(sql2 , function(err , rows ,fields){
    if(err) throw err;
// console.log(rows);
    res.render("table", { examname:name , tableData:rows , gen:gender});
  });
});


//------------------------------------ BITSAT
app.get("/bitsat.html",function(req , res){
  res.render("bitsat");
});
app.post("/bitsat.table",function(req , res){
  var rank=req.body.rank;
  console.log(rank);
  var name="BIT SAT";
  var gender="rank";
  var sql2="SELECT *FROM bitsat WHERE "+rank+">="+rank ;
  database.query(sql2 , function(err , rows ,fields){
    if(err) throw err;
// console.log(rows);
    res.render("table", { examname:name , tableData:rows , gen:gender});
  });
});

// -----------------------------------------------
app.get("/form.html",function(req ,res){
  res.render("form");
});
app.post("/form.html",function(req , res){
  var rank=req.body.rank;
  var gender=req.body.gender;
  var category=req.body.category;
  console.log(gender);
  console.log(rank);
  console.log(category);
  var name="Jee Mains";
  var sql2="SELECT *FROM nit_kurkshetra WHERE "+gender+">="+rank+" AND category="+mysql.escape(category);
  database.query(sql2 , function(err , rows ,fields){
    if(err) throw err;
// console.log(rows);

    res.render("table", { examname:name , tableData:rows , gen:gender});
  });
});

// ---------------------------------------------------------------------------------------PORT
app.listen("4000" , function () {
  console.log("server is running at port 4000");
});
