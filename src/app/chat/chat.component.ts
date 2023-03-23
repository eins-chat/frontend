import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/services/api-client.service';
import { Message, MessageType, User } from '../models/models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  content = 'eine nachricht';
  allMessages: Message[] = [];
  selectedMessages: Message[] = [];
  contacts: Set<string> = new Set();
  selectedChat: string = '';
  selectedChatType: MessageType = MessageType.PRIVATE_CHAT;
  receiver = this.selectedChat;
  searchterm = '';
  searchResults: string[] = [];
  constructor(private router: Router, private apiClient: ApiClientService) {
    this.connect();
    this.loadMessages();
  }

  async ngOnInit() {
    if (!(await this.apiClient.validateSession())) {
      this.router.navigate(['/login']);
    }
  }

  socket: WebSocket | null = null;

  connect() {
    const webSocketUrl = environment.WEBSOCKET_URL;
    this.socket = new WebSocket(webSocketUrl);
    this.socket.onopen = () => {
      console.log('[open] Connection established');
      console.log('Sending to server');
      let registerMessage = {
        token: localStorage.getItem('token'),
      };
      if (this.socket) this.socket.send(JSON.stringify(registerMessage));
    };
    this.socket.onmessage = (event) => {
      console.log(`[message] Data received from server: ${event.data}`);
      this.allMessages.push(JSON.parse(event.data));
      this.setSelectedChat(this.selectedChat);
      this.updateRecentChats();
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
    const message = new Message(
      this.content,
      this.receiver,
      this.selectedChatType
    );
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }
  setSelectedChat(selectedName: any) {
    this.selectedChat = selectedName;
    this.receiver = this.selectedChat;
    this.selectedMessages = this.allMessages.filter(
      (message) =>
        message.author === selectedName || message.receiver === selectedName
    );
    this.selectedChatType = this.selectedMessages[0].type;
  }
  async loadMessages() {
    this.allMessages = await this.apiClient.getMessages();
    this.updateRecentChats();
  }

  updateRecentChats() {
    this.allMessages.forEach((message) => {
      if (message.author) {
        this.contacts.add(message.author);
      }
      this.contacts.add(message.receiver);
    });
    const usernameOfLoggedInUser = localStorage.getItem('username');
    if (usernameOfLoggedInUser) {
      const username = this.contacts.delete(usernameOfLoggedInUser);
    }
  }
  async search() {
    if (this.searchterm.length === 0) {
      this.searchResults = [];
    } else {
      this.searchResults = await this.apiClient.getUsers(this.searchterm);
      const usernameOfLoggedInUser = localStorage.getItem('username');
      if (usernameOfLoggedInUser) {
        const indexOfOwnUsername = this.searchResults.indexOf(
          usernameOfLoggedInUser,
          0
        );
        if (indexOfOwnUsername != -1) {
          this.searchResults.splice(indexOfOwnUsername, 1);
        }
      }
    }
  }
  async createGroup() {
    const usernameOfLoggedInUser = localStorage.getItem('username');
    let memberList: string[];
    if (usernameOfLoggedInUser) {
      memberList = [usernameOfLoggedInUser];
    } else {
      throw new Error('no username in localstorage');
    }
    const groupID = await this.apiClient.createGroup(memberList);
    const message = new Message(
      'Group created',
      groupID,
      MessageType.GROUP_CHAT
    );
    if (this.socket) {
      this.socket.send(JSON.stringify(message));
    }
  }
}
