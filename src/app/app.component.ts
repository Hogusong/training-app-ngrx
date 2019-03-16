import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrxfire';
  
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router) {}

  onToggle() {
    this.sidenav.toggle();
  }

  logout() {
    console.log('logout . . .')
    this.router.navigate(['/']);
  }
}
