import { Injectable, NgZone } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: Client;
  private messageSubject = new BehaviorSubject<{ sender: string; content: string } | null>(null);
  public messages$ = this.messageSubject.asObservable(); // Expose as Observable
  backendUrl=''
  API_URL = environment.apiUrl
  WS_URL = environment.wsUrl
  constructor(private ngZone: NgZone) {
    if(typeof window !== 'undefined'){
      this.backendUrl = window.location.origin.includes('localhost')
      ? 'ws://localhost:8080/ws'
      : this.WS_URL;
    }else{
      this.backendUrl = 'ws://backend:8080/ws';
    }
    this.stompClient = new Client({
      // brokerURL: 'ws://localhost:8080/ws',
      brokerURL: this.backendUrl,
      reconnectDelay: 5000,
      debug: (msg) => console.log(msg),
    });

    this.stompClient.onConnect = () => {
      console.log('Connected to WebSocket');
      this.subscribeToMessages();
    };

    this.stompClient.activate();
  }

  private subscribeToMessages() {
    this.stompClient.subscribe('/topic/public', (message) => {
      console.log('Received:', message.body);
      const parsedMessage = JSON.parse(message.body); // Parse JSON

      // Ensure change detection runs in Angular Zone
      this.ngZone.run(() => {
        this.messageSubject.next(parsedMessage);
      });
    });
  }

  sendMessage(message: { sender: string; content: string }) {
    if (this.stompClient.active) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
        headers: {}
      });
    } else {
      console.error('WebSocket connection is not active.');
    }
  }
}
