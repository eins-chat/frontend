import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Group, Message, MessageType } from '../models/models';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ChatSocketService } from '../services/chat-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messageInput = '';

  allMessages: Message[] = [];
  selectedMessages: Message[] = [];

  contacts: Set<string> = new Set();
  groups: Group[] = [];

  selectedChat: string = '';
  selectedChatId: string = '';
  selectedChatType: MessageType = MessageType.PRIVATE_CHAT;

  searchTerm = '';
  searchResults: string[] = [];

  constructor(
    private router: Router,
    private apiClient: ApiClientService,
    private chatSocket: ChatSocketService
  ) {
    this.connect();
    this.loadMessages();
  }

  async ngOnInit() {
    if (!(await this.apiClient.validateSession())) {
      this.router.navigate(['/login']);
    }
  }

  connect() {
    this.chatSocket.setMessageListener((message) => {
      this.allMessages.push(message);
      this.setSelectedChat(this.selectedChatId);
      this.updateRecentChats();
    });

    this.chatSocket.connect(environment.WEBSOCKET_URL);
  }

  sendMessage() {
    this.chatSocket.sendMessage(
      this.messageInput,
      this.selectedChatId,
      this.selectedChatType
    );

    this.messageInput = '';
  }

  async setSelectedChat(selectedName: string) {
    this.selectedMessages = this.allMessages.filter(
      (message) =>
        message.author === selectedName || message.receiver === selectedName
    );

    this.selectedChatType =
      this.selectedMessages[0]?.type || MessageType.PRIVATE_CHAT;

    if (this.selectedChatType == MessageType.GROUP_CHAT) {
      const group: Group = await this.apiClient.getGroupById(selectedName);
      this.selectedChat = group.name;
      this.selectedChatId = group.id;
    } else {
      this.selectedChat = selectedName;
      this.selectedChatId = selectedName;
    }
  }

  async loadMessages() {
    this.allMessages = await this.apiClient.getMessages();
    this.updateRecentChats();
  }

  updateRecentChats() {
    const groupIDs: Set<string> = new Set();

    this.allMessages.forEach((message) => {
      if (message.author) {
        this.contacts.add(message.author);
      }

      if (message.type == MessageType.PRIVATE_CHAT) {
        this.contacts.add(message.receiver);
      } else {
        groupIDs.add(message.receiver);
      }
    });

    groupIDs.forEach(async (id) => {
      let group = await this.apiClient.getGroupById(id);

      if (!this.groups.find((g) => g.id === group.id)) {
        this.groups.push(group);
      }
    });

    const usernameOfLoggedInUser = localStorage.getItem('username');
    if (usernameOfLoggedInUser) {
      const username = this.contacts.delete(usernameOfLoggedInUser);
    }
  }

  async searchUser() {
    if (this.searchTerm.length === 0) {
      this.searchResults = [];
    } else {
      this.searchResults = await this.apiClient.getUsers(this.searchTerm);
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
    const members: string[] = [];

    if (usernameOfLoggedInUser) {
      members.push(usernameOfLoggedInUser);
    } else {
      throw new Error('No username in localstorage');
    }

    const groupID = await this.apiClient.createGroup(members);

    this.chatSocket.sendMessage(
      'Group created',
      groupID,
      MessageType.GROUP_CHAT
    );
  }
}
