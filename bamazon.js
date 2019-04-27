var mysql=require("mysql")
var inquirer=require("inquirer")
require("console.table")
var connection=mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "HurdChester1973",
    database: "bamazon"
})
connection.connect(function(err){
    if(err){
        console.log (err)
    }
Products()
})
function Products(){
    connection.query("SELECT * FROM products",function(err,res){
        if (err){
            console.log (err)
        }
        console.table(res)
    })
}