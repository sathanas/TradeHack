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

app.configure(function(){
	app.use('/', express.static(__dirname + '/'));
    app.use('/scripts', express.static(__dirname + '/scripts'));
    app.use('/scripts/core', express.static(__dirname + '/scripts/core'));
    //app.use('/socket.io', express.static(__dirname + '/'));
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
	console.log('new user connected');
	socket.broadcast.emit('newuser');


	//Cron job
	new cronJob('*/2 * * * *', function(){
		socket.broadcast.emit('turn');
	}, null, true, "Sweden/Karlshamn");

	
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
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

server.listen(3000);
console.log('Listening on port 3000');
//connection.end();