import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChoiceDialogComponent } from './library/choice-dialog.component';
import { SharedModule } from './library/shared.module';
import { reducers } from './reducers/app.reducer';
import { AuthModule } from './auth/auth.module';

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
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [ ChoiceDialogComponent ]
})
export class AppModule { }
