import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';
import { UIService } from 'src/app/providers/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  notMatched = false;
  errMessage = '';
  isLoading = false;
  loadingSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loadingSubscription = this.uiService.getLodaingSubject()
      .subscribe(res => this.isLoading = res);
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

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
