import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = 'eine nachricht';
  author = 'a';
  receiver = 'b';
  title = 'chat';
  socket: WebSocket | null = null;

  connect() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      console.log('[open] Connection established');
      console.log('Sending to server');
      let registerMessage = {
        author: this.author,
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
