import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { AuthService }       from '../services/auth.service';
      
@Component({
  moduleId: module.id,
  selector: 'stft-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent implements OnInit {
  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() { }

  logout() {
    this.authService.logout();
  }
}