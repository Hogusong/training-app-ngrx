import { Injectable } from '@angular/core';
import { USER, AUTHDATA } from '../models';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { UIService } from './ui.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../reducers/app.reducer';
import * as uiReducer from '../reducers/ui.reducer';
import * as authReducer from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: USER;
  private authSubject = new Subject<boolean>();

  constructor(private uiService: UIService,
              private afAuth: AngularFireAuth,
              private store: Store<RootReducer.STATE>,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new authReducer.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new authReducer.SetUnAuthenticated());
      }
    })
  }

  getAuthSubject() {
    return this.authSubject.asObservable();
  }

  registerUser(authData: AUTHDATA): Promise<any> {
    this.store.dispatch(new uiReducer.StartLoading())
    return new Promise((res, rej) => {
      this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.store.dispatch(new uiReducer.StopLoading())
        })
        .catch(error => {
          this.store.dispatch(new uiReducer.StopLoading())
          this.uiService.openSnackbar(error.message, null, 3000);
          rej(error.message);
        });
    })
  }

  login(authData: AUTHDATA): Promise<any> {
    this.store.dispatch(new uiReducer.StartLoading())
    return new Promise((res, rej) => {
      this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new authReducer.SetAuthenticated());

        this.store.dispatch(new uiReducer.StopLoading())
        this.router.navigate(['/training']);
      })
      .catch(error => {
        this.store.dispatch(new authReducer.SetUnAuthenticated());
        this.store.dispatch(new uiReducer.StopLoading())
        this.uiService.openSnackbar(error.message, null, 3000);
        rej(error.message)
      });
    })
  }

  logout() {
    this.afAuth.auth.signOut();
    RootReducer.appReducer(null, { type: 'LOGOUT' });
  }

  getUser() {
    return { ...this.user };
  }
}
