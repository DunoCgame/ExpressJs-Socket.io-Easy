// conenction
let socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');

let output = document.getElementById('output');
let actions = document.getElementById('actions');

//eventos dom
btn.addEventListener('click', function() {
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  });
});

message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

//eventos dom

//puro sokect
// client-side
//id del cliente 
socket.on("connect", () => {
  console.log("cliente",socket.id); // ojIckSD2jqNzOqIrAGzL
});

socket.on("hello",(arg) => {
  console.log(arg); 
});

socket.on("hola",(arg) => {
  console.log(arg);
});

socket.on("someevent",(arg) => {
  console.log(arg);
});






//envia el mensage
socket.on('chat:message', function(data) {
  actions.innerHTML = '';
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
  </p>`
});

//detecta se se escribe 
socket.on('chat:typing', function(data) {
  actions.innerHTML =  `<p><em>${data} is typing a message...</em></p>`
});