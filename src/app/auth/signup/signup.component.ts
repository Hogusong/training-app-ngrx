import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as RootReducer from '../../reducers/app.reducer';
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
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<RootReducer.STATE>) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoading$ = this.store.select(RootReducer.getIsLoading);
  }

  onSubmit(form: NgForm) {
    this.notMatched = false;
    if (form.value.password != form.value.confirmPW) {
      this.notMatched = true;
    } else {
      this.authService.registerUser({
        email: form.value.email,  password: form.value.password
      })
      .catch(message => this.errMessage =  message);
      setTimeout(() => this.errMessage = '', 3000);
    }
  }
}
