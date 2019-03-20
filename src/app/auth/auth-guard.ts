import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { AuthService } from "../providers/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

  authStatus = false;

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | 
              Observable<boolean> | Promise<boolean> {
    this.authStatus = this.authService.getAuthStatus();
    if (this.authStatus) {  return true;  }
    this.router.navigate(['/login']);
  }
}