require.config( {
	baseUrl: "",
  shim: {
    'socketio': {
      exports: 'io'
    }
  },
	paths: {
		jquery: "scripts/core/jquery",
    socketio: 'http://194.47.142.170:3000/socket.io/socket.io'
	}
});

require(["jquery", "socketio"], function($, io)
{
  //Tha sockets
  var socket = io.connect('http://194.47.142.170:3000');
  socket.on('newuser', function (data) {
    console.log('Ny användare');
    $('#playerinfo ul').prepend('<li>Player connected.</li>');
    console.log(data);
  });

  socket.on('turn', function(data){
    console.log('TURN!!!');
    $('#playerinfo ul').prepend('<li>'+data.time+' - TURN!!</li>');
  });

	var url2 = "http://194.47.142.170:3000/api/cities";
	$.ajax({ url: url2} )
  .done(function(data) {
    $.each(data, function(i, item){
      $('#cityinfolist').append('<li>'+item.name+'</li>');
    });

    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });

});

