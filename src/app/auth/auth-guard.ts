import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from "@angular/router";
import { Observable } from "rxjs";
import { take } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as RootReducer from '../reducers/app.reducer';

import { AuthService } from "../providers/auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  authStatus = false;

  constructor(private authService: AuthService,
              private store: Store<RootReducer.STATE>,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | 
              Observable<boolean> | Promise<boolean> {
    return this.store.select(RootReducer.getAuthStatus).pipe(take(1));
    // this.authStatus = this.authService.getAuthStatus();
    // if (this.authStatus) {  return true;  }
    // this.router.navigate(['/auth/login']);
  }

  // using with lazy loader
  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(RootReducer.getAuthStatus);
  }
}