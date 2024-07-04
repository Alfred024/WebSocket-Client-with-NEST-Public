import { Manager, Socket } from "socket.io-client";

export default function connectToServer(token : string) {
    const manager = new Manager(
        'http://localhost:3000/socket.io/socket.io.js',
        {
            extraHeaders:{
                'authentication': token,
            }
        }
    );

    const socket = manager.socket('/serverWS');
    addListeners(socket);
}

function addListeners(socket:Socket) {
    let formMessage = document.querySelector<HTMLFormElement>('#form_message')!;
    let inputMessage = document.querySelector<HTMLInputElement>('#input_message')!;
    let clientsList = document.querySelector('#unordered_list')!;

    socket.on('connect', ()=>{
        let serverStatus_span = document.getElementById('serverStatus_span')!;
        serverStatus_span.innerHTML = 'Server Connected';
    });

    socket.on('disconnect', ()=>{
        let serverStatus_span = document.getElementById('serverStatus_span')!;
        serverStatus_span.innerHTML = 'Server Disconnected';
    });

    socket.on('clients-updated', (clients : string[])=>{
        console.log(clients);
        
        let listItems = '';
        clients.forEach(item=>{
            listItems += `<li>${item}</li>`;
        });
        clientsList.innerHTML = listItems;
    });

    formMessage.addEventListener('submit', (event)=>{
        event.preventDefault();

        if (inputMessage.value.trim().length <= 0 ) return;
        socket.emit('client-message', {clientId: socket.id, message: inputMessage.value});

        inputMessage.value = '';
    });

    socket.on('server-message', (message)=>{
        // Renderizar el nuevo mensaje entrante
        let li = document.createElement('li');
        li.innerHTML = `
            <li style="display:flex;">
                ${message.fullName}: ${message.message}
            </li>
        `;
        clientsList.appendChild(li);
    });
}