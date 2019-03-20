import { Injectable } from '@angular/core';
import { USER, AUTHDATA } from '../models';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: USER;
  authStatus = false;
  private authSubject = new Subject<boolean>();

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  getAuthStatus() {
    return this.authStatus;
  }

  registerUser(authData: AUTHDATA) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AUTHDATA) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result)
        this.authSubject.next(this.authStatus = true);
        this.router.navigate(['/training']);
      })
      .catch(error => {
        console.log(error);
        this.authSubject.next(this.authStatus = false);
      });
  }

  logout() {
    this.authSubject.next(this.authStatus = false);
  }

  getUser() {
    return { ...this.user };
  }
}
