import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email, password: form.value.password
    })
    this.router.navigate(['/'])
    // this.errMessage = '';
    // console.log(form.value);
    // this.errMessage = 'Username is not exist. Try another.';
    // setTimeout(() => this.errMessage = '', 3000);
  }
}
