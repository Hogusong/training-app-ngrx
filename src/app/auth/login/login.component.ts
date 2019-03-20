import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/providers/auth.service';
import { UIService } from 'src/app/providers/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errMessage = '';
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.getLodaingSubject()
      .subscribe(res => this.isLoading = res);
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

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
