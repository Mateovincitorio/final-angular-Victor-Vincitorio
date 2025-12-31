import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('clase-4-TP');

  ngOnInit(): void {
    const saved = localStorage.getItem('app-theme') as 'light' | 'dark' | null;
    if (saved === 'dark') document.body.classList.add('dark-theme');
  }
}
