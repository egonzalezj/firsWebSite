var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'ddwkf5i3u',
  api_key: '852328578962597',
  api_secret: 'bQ-858iTtzbQVUP3JipWzeJ7i2A'
});

var app = express();

mongoose.connect("mongodb://localhost/firstWebsite")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer({dest:"./uploads"}));

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

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/menu", function(req, res) {
  Product.find(function(err, document) {
    if(err) {
      console.log(err);
    }
    res.render("menu/index", {products: document})
  });
});

app.post("/menu", function(req, res) {
	if(req.body.password == 12345) {
		var data = {
			title: req.body.title,
			description: req.body.description,
			imageUrl: "data.png",
			pricing: req.body.pricing
		}

		var product = new Product(data);

    cloudinary.uploader.upload(req.files.image_avatar.path,
      function(result) {
        product.imageUrl = result.url;
        product.save(function(err) {
          console.log(product);
          res.render("index");
        });
      }
    );

		/*product.save(function(err) {
			console.log(product);
			res.render("index");
		});*/
	}
	else {
		res.render("menu/new")
	}
});

app.get("/menu/new", function(req, res) {
	res.render("menu/new")
});

app.listen(3000);
