import { ChangeDetectorRef, Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { WebsocketService } from './webscoket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent  {
  title = 'websocketapp';
  newMessage: string = '';
  messages: { sender: string; content: string }[] = [];

  constructor(public wsService: WebsocketService) {}

  ngOnInit() {
    this.wsService.messages$.subscribe((message) => {
      if (message) {
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage({ sender: 'User', content: this.newMessage });
      this.newMessage = ''; // Clear input field
    }
  }
}
