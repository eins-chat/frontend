import { Injectable } from '@angular/core';
import { Message, MessageType } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  private socket?: WebSocket;
  private messageListener?: MessageListener;

  constructor() {}

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = (e) => this.onOpen(e);
    this.socket.onmessage = (e) => this.onMessage(e);
    this.socket.onclose = (e) => this.onClose(e);
    this.socket.onerror = (e) => this.onError(e);
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  setMessageListener(listener: MessageListener) {
    this.messageListener = listener;
  }

  send(data: object) {
    if (!this.socket) {
      throw new Error('Socket is not opened');
    }

    const json = JSON.stringify(data);

    this.socket.send(JSON.stringify(data));
  }

  sendMessage(content: string, receiver: string, type: MessageType) {
    this.send(<Message>{
      content: content,
      receiver: receiver,
      type: type,
    });
  }

  private onOpen(event: Event) {
    console.log('[Chat Socket]: Connection established');

    this.send({
      token: localStorage.getItem('token'),
    });
  }

  private onMessage(event: MessageEvent<any>) {
    const { data } = event;

    if (this.messageListener) {
      this.messageListener(JSON.parse(data));
    }
  }

  private onClose(event: CloseEvent) {
    if (event.wasClean) {
      console.log(
        `[Chat Socket] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[Chat Socket] Connection died');
    }
  }

  private onError(event: Event) {
    console.log('[Chat Socket] An error occurred:');
    console.log(event);
  }
}

type MessageListener = (message: Message) => void;
