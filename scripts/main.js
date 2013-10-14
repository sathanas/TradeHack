require.config( {
	baseUrl: "",
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
	paths: {
		jquery: "scripts/core/jquery",
    socketio: 'socket.io/socket.io'
	}
});

require(["jquery", "socketio"], function($, io)
{
  //Tha sockets
  var socket = io.connect('http://194.47.142.170:3000');
  socket.on('newuser', function (data) {
    console.log('Ny användare');
  });

	var url2 = "http://194.47.142.170:3000/api/products"
	$.ajax({ url: url2} )
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

});

