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

  socket.on('turn', function(data){
    console.log('TURN!!!');
  });

	var url2 = "http://194.47.142.170:3000/api/cities"
	$.ajax({ url: url2} )
  .done(function(data) {
  	$('#cityinfo').html(data);
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

});

