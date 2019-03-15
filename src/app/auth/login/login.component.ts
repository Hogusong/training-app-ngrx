import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.errMessage = '';
    console.log(form.value);
    this.errMessage = 'Username is not exist. Try another.';
    setTimeout(() => this.errMessage = '', 3000);
  }
}
