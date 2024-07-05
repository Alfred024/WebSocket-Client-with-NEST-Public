import connectToServer from './socket.io'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WEB SOCKETS</h1>
    <br>

    <div>
      <input id="token-input" placeholder="Introduzca el JWT">
      <button id="token-button"> Enviar </button>
    </div>

    <span id="serverStatus_span">OFFLINE</span>
    <br>

    <h2> Clientes conectados </h2>
    <ul id="clients_list">
    </ul>
    <br>

    <h2> Lista de mensajes </h2>
    <ul id="messages_list">
    </ul>
    <br>

    <form id="form_message">
      <input placeholder="Escribe un mensaje..." id="input_message">
    </form>

  </div>
`

const tokenInput = document.querySelector<HTMLInputElement>('#token-input')!;
const tokenButton = document.querySelector('#token-button')!;

tokenButton.addEventListener('click', ()=>{
  
  if(tokenInput.value.trim().length <= 0) return alert('You must input a token to proceed');
  connectToServer(tokenInput.value.trim());
});