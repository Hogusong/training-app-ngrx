import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AppReducer from '../../app.reducer';

import { AuthService } from 'src/app/providers/auth.service';
import { UIService } from 'src/app/providers/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage = '';
  isLoading$: Observable<boolean>;
  loadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService,
              private store: Store<{ ui: AppReducer.STATE }>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
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
