require.config( {
	baseUrl: "scripts/core",
	paths: {
		jquery: "jquery"
	}
});

require(["jquery"], function($) 
{
  //Tha sockets
  var socket = io.connect('http://194.47.142.170');
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

