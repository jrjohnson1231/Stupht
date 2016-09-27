import { Component, OnInit, OnDestroy } from '@angular/core';

import { Cable } from '../common/cable'
import { AuthService } from '../services/auth.service';

import { Subscription }  from 'rxjs/Rx';

@Component({
  selector: 'stft-chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  stream: Subscription;
  cable: Cable;

  constructor( private authService: AuthService ) {}

  ngOnInit() {
    if (this.authService.currentUser) {
      let url: string;
      if (process.env.ENV === 'production') {
        url = location.origin.replace(/^http/, 'ws') + '/api/v1/cable';
      } else {
        url = 'ws://localhost:3000/api/v1/cable';
      }

      this.cable = new Cable(url,
      {
        channel: "ChatChannel",
        email: this.authService.currentUser.email,
        id_token: this.authService.authToken
      })

      this.stream = this.cable.subscribe(
        (data: any) => {this.messages.push(data.message); console.log(data, this.messages)},
        (errors: any) => console.log(errors)
      )
      
    }
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  sendMessage(message: string) {
    this.cable.next({message});
  }
}