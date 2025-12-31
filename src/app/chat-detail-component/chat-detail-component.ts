import { CommonModule } from '@angular/common';
import {
  Component,
  Signal,
  computed,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat';
import { Chat } from '../../interfaces/chat';

@Component({
  selector: 'app-chat-detail-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-detail-component.html',
  styleUrl: './chat-detail-component.css',
})
export class ChatDetailComponent implements AfterViewChecked {
  chatSignal!: Signal<Chat | undefined>;
  newText = '';
  private id?: string;
  private previousCount = 0;

  @ViewChild('messagesRef') private messagesRef!: ElementRef<HTMLElement>;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit(): void {
    /* Busca dentro de la url el parametro :id */
    this.id = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.id) {
      /* Busco el chat por id */
      this.chatSignal = this.chatService.getChatSignal(this.id);
      this.previousCount = this.chatSignal()?.messages?.length ?? 0;
    } else {
      //Fallback
      this.chatSignal = computed(() => undefined);
    }
  }

  ngAfterViewChecked(): void {
    // Si cambió el número de mensajes, hago scroll al final
    const current = this.chatSignal()?.messages?.length ?? 0;
    if (this.messagesRef && current !== this.previousCount) {
      this.previousCount = current;
      this.scrollToBottom();
    }
  }

  send() {
    if (!this.id || !this.newText.trim()) {
      //No se puede enviar si esta condicion es verdadera
      return;
    }
    this.chatService.sendMessage(this.id, this.newText.trim(), true);
    this.newText = '';
    // Scroll after a small timeout to allow DOM to update
    setTimeout(() => this.scrollToBottom(), 50);
  }

  private scrollToBottom() {
    try {
      const el = this.messagesRef.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (e) {
      /* ignore */
    }
  }

  formatDate(date: string) {
    if (!date) {
      return '';
    }
    const datetime = new Date(date);
    return datetime.toLocaleString();
  }
}
