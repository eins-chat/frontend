import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  content = 'eine nachricht';
  receiver = 'b';
  constructor() {
    this.connect();
  }

  ngOnInit(): void {}

  socket: WebSocket | null = null;

  connect() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      console.log('[open] Connection established');
      console.log('Sending to server');
      let registerMessage = {
        token: localStorage.getItem('token'),
      };
      if (this.socket) this.socket.send(JSON.stringify(registerMessage));
    };
    this.socket.onmessage = function (event) {
      console.log(`[message] Data received from server: ${event.data}`);
    };

    this.socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
        );
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };

    this.socket.onerror = function (error) {
      console.log(`[error]`);
    };
  }

  sendMessage() {
    const message = {
      receiver: this.receiver,
      content: this.content,
    };
    if (this.socket) this.socket.send(JSON.stringify(message));
  }
}
