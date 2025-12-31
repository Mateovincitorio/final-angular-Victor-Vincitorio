import { Component } from '@angular/core';
import { ChatService } from '../services/chat';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-chat-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-chat-component.html',
  styleUrl: './new-chat-component.css',
})
export class NewChatComponent {
  name = '';
  initial = '';
  constructor(private chatService: ChatService, private router: Router) {}

  create() {
    if (!this.name.trim()) {
      return;
    }
    const chat = this.chatService.createChat(this.name.trim());
    if (this.initial.trim()) {
      this.chatService.sendMessage(chat.id, this.initial.trim(), true);
    }
    this.router.navigate(['/chats', chat.id]);
  }

  cancel() {
    this.router.navigate(['/chats']);
  }
}
