var exp = require("express")
var app = exp();
const mysql = require("mysql");
const cors =require("cors")

app.use(cors());
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"to_do"
});
app.use(exp.json());

conn.connect((err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("connected Succesfully")
})

app.post("/db", (req, res) => {
    const { todo_name } = req.body;
  
    const sql = `INSERT INTO to_do_list (todo_name) VALUES (?)`;
  
    conn.query(sql, [todo_name], (err, results) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.json(results);
    });
  });

app.get("/db/get",(req,res)=>{
    conn.query("SELECT * FROM to_do_list",(err,results,fields)=>{
        console.log("data sended")
        return res.json({data:results});
       
    })
})
   

app.get("/", (req, res) => {
    console.log("Hey Their!")
    let code=`<p>Type localhost:3200/db/get</p><a href="http://localhost:3200/db/get">OR Click</a>`;
    res.send(code);
});
app.listen(3200, () => {
    console.log("server Started on ", 3200)
});