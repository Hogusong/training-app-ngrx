import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../reducers/app.reducer';

import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage = '';
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<RootReducer.STATE>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(RootReducer.getIsLoading);
    // this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.loadingSubscription = this.uiService.getLodaingSubject()
    //   .subscribe(res => this.isLoading = res);
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email, password: form.value.password
    })
    .catch(message => {
      this.errMessage = message
      setTimeout(() => this.errMessage = '', 3000);
    });
  }
}
