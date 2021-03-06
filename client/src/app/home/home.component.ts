import { Component, OnInit } from '@angular/core';
import { Cable } from '../common/cable'
import { AuthService } from '../services/auth.service';
      
@Component({
  selector: 'stft-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  messages: string[] = ["Hello"];

  constructor( private authService: AuthService ) { }
  
  ngOnInit() {
    // if (this.authService.currentUser) {
    //   let url: string;
    //   if (process.env.ENV === 'production') {
    //     url = location.origin.replace(/^http/, 'ws') + '/api/v1/cable';
    //   } else {
    //     url = 'ws://localhost:3000/api/v1/cable';
    //   }

    //   let cable = new Cable(url,
    //   {
    //     channel: "PostChannel",
    //     email: this.authService.currentUser.email,
    //     id_token: this.authService.authToken
    //   })

    //   let stream = cable.subscribe(
    //     (data: any) => {this.messages.push(data.message); console.log(data, this.messages)},
    //     (errors: any) => console.log(errors)
    //   )

    //   cable.next({hello: "world"});
      
    // }
  }

  
}