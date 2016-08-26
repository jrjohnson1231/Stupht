import { Component, OnInit } from '@angular/core';

import { AuthService }       from '../services/auth.service';
      
@Component({
  moduleId: module.id,
  selector: 'stft-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor( private authService: AuthService) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}