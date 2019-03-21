import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChoiceDialogComponent } from './library/choice-dialog.component';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { SharedModule } from './library/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidebarComponent,
    ChoiceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    TrainingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [ ChoiceDialogComponent ]
})
export class AppModule { }
