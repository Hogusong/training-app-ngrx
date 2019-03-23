import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../reducers/app.reducer';

import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authStatus$: Observable<boolean>;

  constructor(private authService: AuthService,
              private store: Store<RootReducer.STATE>, 
              private router: Router) { }

  ngOnInit() {
    this.authStatus$ = this.store.select(RootReducer.getAuthStatus);
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
