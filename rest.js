// Our collection of books
var books = [
		{ id: 1, title: "A Brave New World", author: "Aldous Huxley", price: 1.53 },
		{ id: 2, title: "Fahrenheit 451", author: "Ray Bradbury", price: 2.17 },
		{ id: 3, title: "Neuromancer", author: "William Gibson", price: 4.92 },
		{ id: 4, title: "A Scanner Darkley", author: "Philip K. Dick", price: 3.33 }
	],
	maxId = 4; // Out current "max ID" of our collection

var express = require("express"), // Require in express
	app = express();

app.configure(function(){
	// We need to use the bodyParser to get the information posted
	app.use(express.bodyParser());
	// Allows us to route the URIs in a dynamic manner
	app.use(app.router);
});

// When we GET the collection URI, return the collection
app.get("/books", function(req, res){
	res.status(200);
	res.json(books);
});

// When we GET a specific book by ID, return that book
app.get("/books/:id", function(req, res){
	var book;
	books.some(function(b){
		return book = (b.id == req.params.id) ? b : false;
	});
	if(book){
		res.status(200);
		res.json(book);
	}else{
		res.status(404);
		res.json({ status: 404 });
	}
});

// We should be trying to update a book based on ID
app.put("/books/:id", function(req, res){
	var data = request.body, // Read the data by
		bookIdx;
	data.id = request.params.id || data.id; // Allow the URI ID to override any supplied ID
	// Find the book
	books.some(function(b, idx){
		if(b.id == req.params.id){
			bookIdx = idx;
			return true;
		}
	});
	if(bookIdx){
		// If we found the book, update the book in the collection
		books[bookIdx] = data;
		res.status(200);
		res.json(data);
	}else{
		// Book wasn't found
		res.status(404);
		res.json({ status: 404 });
	}
});

// We should be trying to add a book
app.post("/books", function(req, res){
	var data = request.body; // Retrieve the books data
	data.id = maxId++; // Generate a new ID
	books.push(data); // Add it to the collection
	res.header("Location", "/books/" + data.id); // Return a new URI for the book
	res.status(200);
	res.json(data);
});

// Start listening for requests on port 80
app.listen(8099);