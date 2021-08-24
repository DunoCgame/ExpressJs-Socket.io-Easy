const express = require('express');
const path = require('path');
const app = express();

const socket = require('socket.io');

// settings
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

// listen the server
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});

//socket
const io = socket(server);
// console.log(io);

//iniiar coneccion a socket
io.on('connection', (socket) => {
  
  socket.join('sala1');
	io.to('sala1').emit('someevent',"de la sala1");
  
  
		console.log('socket connection opened:', socket.id);
		
		// socket.emit("hello", "Hola te has Connectado");
		
		// socket.volatile.emit ("hello", "podría o no ser recibido mesaje volatil" );
		
		// io.local.emit("hola","mensaje local");
		

  ////obtienene la informacion del chat
	  socket.on('chat:message', function(data) {
		io.sockets.emit('chat:message', data); //emitir mensage
	  });

  ////obtienene la informacion del chat
	  socket.on('chat:typing', function(data) {
		socket.broadcast.emit('chat:typing', data); //emitir mensage
	  });
  
  
  //detectar desconeccion
	  socket.on('disconnect',() => {
			console.log("disconnect ",socket.id)	
	  });
	
	// socket.removeAllListeners();
	// socket.removeAllListeners ( "chat:message" ); 






});


	



// informacion
// https://socket.io/docs/v4/namespaces/
// /historial de eventos

//funcion de escucha constante
// socket.on ( "detalles" , ( ... args ) => { // ... });

//funcion de escucha una sola ves
// socket.once ( "detalles" , ( ... args ) => { // ... });

// elimina el oyente de la matris de oyentes
// socket.off ( "detalles" , oyente);

// elimina todos los oyentes o los del eventName especificado .
	// para un evento específico
	 // socket.removeAllListeners ( "detalles" ); 
	// para todos los eventos
	 // socket.removeAllListeners ();

// Agrega un oyente que se activará cuando se emita cualquier evento
	// socket.onAny ( ( eventName, ... args ) => { // ... });
  
 // Agrega un oyente que se activará cuando se emita cualquier evento.
  // El oyente se agrega al comienzo de la matriz de oyentes
	// socket.prependAny ( ( eventName, ... args ) => { // ... });
 
 // Elimina todos los oyentes catch-all, o el oyente dado. 
// const listener = ( eventName, ... args ) => { console .log (eventName, args); }
 

// socket.onAny (oyente);

// // y luego ...
 // socket.offAny (oyente);

// // o todos los oyentes
// Transmitir a clientlocal
  // io.local.emit ( "hola" , "mundo" );
  
  // enviar a todos menos al que emite
  // socket.broadcast.emit('chat:typing', data);