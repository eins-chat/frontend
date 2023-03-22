import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../models/models';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.css'],
})
export class ChatPreviewComponent implements OnInit {
  @Input() username = '';
  @Output() newClickEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  previewClick() {
    this.newClickEvent.emit(this.username);
  }
}
