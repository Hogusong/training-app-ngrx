import { Injectable } from '@angular/core';
import { USER, AUTHDATA } from '../models';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UIService } from './ui.service';
import { Store } from '@ngrx/store';
import * as AppReducer from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: USER;
  authStatus = false;
  private authSubject = new Subject<boolean>();

  constructor(private uiService: UIService,
              private afAuth: AngularFireAuth,
              private store: Store<{ui: AppReducer.STATE}>,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authSubject.next(this.authStatus = true);
        this.router.navigate(['/training']);
      } else {
        this.authSubject.next(this.authStatus = false);
        // this.router.navigate(['/auth/login']);
      }
    })
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  getAuthStatus() {
    return this.authStatus;
  }

  registerUser(authData: AUTHDATA): Promise<any> {
    // this.uiService.setLoadingSubject(true);
    this.store.dispatch({ type: 'START_LOADING' })
    return new Promise((res, rej) => {
      this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            // this.uiService.setLoadingSubject(false);
            this.store.dispatch({ type: 'STOP_LOADING' })
            // this.router.navigate(['/auth/login']);  
        })
        .catch(error => {
          // this.uiService.setLoadingSubject(false);
          this.store.dispatch({ type: 'STOP_LOADING' })
          this.uiService.openSnackbar(error.message, null, 3000);
          rej(error.message);
        });
    })
  }

  login(authData: AUTHDATA): Promise<any> {
    // this.uiService.setLoadingSubject(true);
    this.store.dispatch({ type: 'START_LOADING' })
    return new Promise((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSubject.next(this.authStatus = true);
        // this.uiService.setLoadingSubject(false);
        this.store.dispatch({ type: 'STOP_LOADING' })
        this.router.navigate(['/training']);
      })
      .catch(error => {
        this.authSubject.next(this.authStatus = false);
        // this.uiService.setLoadingSubject(false);
        this.store.dispatch({ type: 'STOP_LOADING' })
        this.uiService.openSnackbar(error.message, null, 3000);
        rej(error.message)
      });
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authSubject.next(this.authStatus = false);
  }

  getUser() {
    return { ...this.user };
  }
}
