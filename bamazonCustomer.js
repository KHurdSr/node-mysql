var mysql = require("mysql")
var inquirer = require("inquirer")
require("console.table")
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "HurdChester1973",
    database: "bamazon"
})
connection.connect(function (err) {
    if (err) {
        console.log(err)
    }
    products()
})
function products() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err)
        }
        console.table(res)
        getid()
    })
}
function getid() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "id",
                message: "what is the id of the product?"
            }, {
                type: "input",
                name: "quantity",
                message: "how many units of the product?"
            }, 
        ])
        .then(answers => {

            console.log(answers)
            connection.query("SELECT * from products where item_id=" + answers.id, function (err, res) {
                if (err){
                    console.log (err) 
                }
                var userquantity=answers.quantity
                var stockquantity=res[0].stock_quantity
                if (userquantity>stockquantity) {
                    console.log ("insufficient quantity")
                    products()
                }
                console.table (res)
            })
        });
}