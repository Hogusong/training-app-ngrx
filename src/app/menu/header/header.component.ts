import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../reducers/app.reducer';

import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('onToggle') onToggle = new EventEmitter();
  authStatus$: Observable<boolean>;
   
  constructor(private authService: AuthService,
              private store: Store<RootReducer.STATE>, 
              private router: Router) { }

  ngOnInit() {
    this.authStatus$ = this.store.select(RootReducer.getAuthStatus);
  }

  openSidenav() {
    this.onToggle.emit();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }
}
