import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/providers/auth.service';
import { USER } from 'src/app/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  authStatus = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.getAuthSubject()
      .subscribe(res => this.authStatus = res )
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
