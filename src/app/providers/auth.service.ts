import { Injectable } from '@angular/core';
import { USER, AUTHDATA } from '../models';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: USER;
  authStatus = false;
  private authSubject = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private snackbar: MatSnackBar,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      console.log(user)
      if (user) {
        this.authSubject.next(this.authStatus = true);
        this.router.navigate(['/training']);
      } else {
        this.authSubject.next(this.authStatus = false);
        this.router.navigate(['/login']);
      }
    })
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  getAuthStatus() {
    return this.authStatus;
  }

  registerUser(authData: AUTHDATA) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.snackbar.open(error.message, null, { duration: 3000 });
      });
  }

  login(authData: AUTHDATA): Promise<any> {
    return new Promise((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSubject.next(this.authStatus = true);
        this.router.navigate(['/training']);
      })
      .catch(error => {
        this.authSubject.next(this.authStatus = false);
        this.snackbar.open(error.message, null, { duration: 3000 });
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
