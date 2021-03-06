import { Component, OnInit } from '@angular/core';
import { NgForm }    from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { AuthService }    from '../services/auth.service';
import { JwtHelper }      from 'angular2-jwt';

import { MapToIterablePipe }  from '../pipes/map-to-iterable.pipe';
      
@Component({
  selector: 'stft-login-form',
  templateUrl: 'login-form.component.html',
  pipes: [MapToIterablePipe]
})

export class LoginFormComponent implements OnInit {
  active = true;
  errors = {};
  form = {};
  submitted = false;
  token: string;

  constructor( private authService: AuthService, private router: Router ) { }

  ngOnInit() { }

  onSubmit() {
    this.submitForm();
  }

  submitForm() {
    this.authService.login(this.form).subscribe(
        data => { this.errors = null; this.router.navigate(['/']) },
        errors => this.errors = errors
      )
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
  
}