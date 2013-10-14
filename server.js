var express = require('express');
var mysql      = require('mysql');
var cronJob = require('cron').CronJob;
var socketio = require('socket.io');
var http = require('http');
var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var server = http.createServer(app);
var io = socketio.listen(server);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database: 'tradehack',
  port: 8889
});

connection.connect();

//Old stuff
var data = {
	'test': 'test'
};


//Cron job
new cronJob('* * * * *', function(){
    console.log('You will see this message every second');
}, null, true, "Sweden/Karlshamn");


//Queryfunction
var query = function(query, callback){
	var result;

	connection.query(query, function(err, rows, fields) {
		if (err) throw err;
		result = rows;
		
		callback(result);
	});
};

io.sockets.on('connection', function(socket){
	socket.broadcast.emit('newuser');
});

app.get('/', function(req, res){
  res.send('Hello World');
});

//All products
app.get('/api/products', function(req, res){
	query('SELECT * FROM products', function(result){
		console.log(result);
		res.send(200, result);
	});
});

//All cities
app.get('/api/cities', function(req, res){
	query('SELECT * FROM cities', function(result){
		console.log(result);
		res.send(200, result);
	});
});

//All products for city
app.get('/api/citiesproducts/:id', function(req, res){
	var id = req.params.id;
	query('SELECT * FROM products INNER JOIN cities_has_products ON products.id = cities_has_products.products_id WHERE cities_has_products.cities_id = '+id, function(result){
		console.log(result);
		res.send(200, result);
	});
});

app.post('/api/products', function(req, res){

});

app.listen(3000);
console.log('Listening on port 3000');
//connection.end();