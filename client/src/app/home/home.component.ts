import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
      
@Component({
  moduleId: module.id,
  selector: 'stft-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  constructor( private authService: AuthService ) { }

  ngOnInit() { }

  
}