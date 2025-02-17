import { ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebsocketService } from './webscoket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent  {
  @ViewChild('messageInput') messageInput!: ElementRef;   //Get reference to the input box
  title = 'websocketapp';
  newMessage: string = '';
  messages: { sender: string; content: string }[] = [];

  ngAfterViewInit(){
    this.messageInput.nativeElement.focus();
  }


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
      this.messageInput.nativeElement.focus();
    }

  }

  handleKeyDown(event: KeyboardEvent){
    if(event.key === 'Enter' && !event.shiftKey){
      event.preventDefault(); //Prevent new line
      this.sendMessage(); //Send the message
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent){
    if(!this.messageInput) return;
    const input = this.messageInput.nativeElement;
    const istypingCharacter = event.key.length === 1 || event.key === 'Backspace';
    if(!document.activeElement || document.activeElement !== input && istypingCharacter){
      input.focus(); //Automatically focus input if its not active
    }
  }





}
