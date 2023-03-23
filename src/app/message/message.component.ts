import { Component, Input, OnInit } from '@angular/core';
import { Message, MessageType } from '../models/models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message = {
    author: '',
    content: '',
    type: MessageType.PRIVATE_CHAT,
    receiver: '',
    timestamp: 0,
  };
  constructor() {}

  ngOnInit(): void {}
}
