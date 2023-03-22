import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/models';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit {
  @Input() messages: Message[] = [];
  constructor() {}

  ngOnInit(): void {}
}
