import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output('onToggle') onToggle = new EventEmitter();
  authStatus = false;
  authSubscription:Subscription ;
   
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.getAuthSubject()
      .subscribe(res => this.authStatus = res )
  }

  openSidenav() {
    this.onToggle.emit();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
