import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ng Fitness';
  
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthListener();
  }

  onToggle() {
    this.sidenav.toggle();
  }
}
