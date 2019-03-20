import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate;
  notMatched = false;
  errMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.notMatched = false;
    if (form.value.password != form.value.confirmPW) {
      this.notMatched = true;
    } else {
      this.authService.registerUser({
        email: form.value.email,  password: form.value.password
      });
      this.errMessage = 'The email address is already in use by another account.'
      setTimeout(() => this.errMessage = '', 3000);
    }
  }
}
