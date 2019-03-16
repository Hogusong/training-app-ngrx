import { Injectable } from '@angular/core';
import { USER, AUTHDATA } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: USER;


  constructor() { }

  registerUser(authData: AUTHDATA) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    };
  }

  login(authData: AUTHDATA) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString()
    };
  }

  logouit() {
    this.user = null;
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
