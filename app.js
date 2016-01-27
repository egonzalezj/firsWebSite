var express = require('express');

var mongoose = require('mongoose')

var app = express();

mongoose.connect("mongodb://localhost/firstWebsite")
// JSON Object
//{
//	title: "Mi primer producto"
//	description: "Un super producto"
//}

//Define schema of products
var productSchema = {
	title: String,
	description: String,
	imageUrl: String,
	pricing: Number
};

var Product = mongoose.model("Product", productSchema)

app.set("view engine", "jade");

app.use(express.static("public"));

app.get("/", function(req,res) {

	/*var data = {
		title: "Mi primer súper producto",
		description: "Una gran compra",
		imageUrl: "data.png",
		pricing: 10
	}

	var product = new Product(data);

	product.save(function(err) {
		console.log(product);
	});*/

	res.render("index");
});

app.get("/menu/new", function(req, res){
	res.render("menu/new")
});

app.listen(3000);
