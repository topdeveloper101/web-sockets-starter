// Put all your frontend code here.
const messageList = document.querySelector('ul');
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');
const socket = new WebSocket(`ws://${window.location.host}`);
socket.addEventListener('open', () => {
  console.log('Connected to Server ✅');
});
socket.addEventListener('message', (message) => {
  const li = document.createElement('li');
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener('close', () => {
  console.log('Disconnected from Server ❌');
});
const makeMessage = (type, payload) => JSON.stringify({ type, payload });
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = messageForm.querySelector('input');
  socket.send(makeMessage('message', input.value));
  input.value = '';
});
nickForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = nickForm.querySelector('input');
  socket.send(makeMessage('nick', input.value));
});
