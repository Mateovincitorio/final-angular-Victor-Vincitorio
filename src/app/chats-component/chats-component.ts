import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ChatService } from '../services/chat';

@Component({
  selector: 'app-chats-component',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './chats-component.html',
  styleUrl: './chats-component.css',
  standalone: true,
})
export class ChatsComponent {
  theme: 'light' | 'dark' = 'light';

  constructor(public chatService: ChatService, private router: Router) {
    // Load saved theme
    const saved = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (saved) {
      this.theme = saved;
      this.applyTheme();
    }
  }

  get selectedId(): string | null {
    const match = this.router.url.match(/\/chats\/(.+)/);
    return match ? match[1] : null;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('app-theme', this.theme);
    this.applyTheme();
  }

  private applyTheme() {
    if (this.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  avatarColor(name: string) {
    // Simple hash from first char to generate pastel color
    if (!name) return '#e2e8f0';
    const char = name.trim()[0].toUpperCase().charCodeAt(0);
    const hue = (char * 37) % 360;
    return `hsl(${hue}deg 70% 78%)`;
  }
}
