import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/models';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message = {
    author: '',
    content: '',
    receiver: '',
    timestamp: 0,
  };
  constructor() {}

  ngOnInit(): void {}
}
