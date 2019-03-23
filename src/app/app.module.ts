import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidebarComponent } from './menu/sidebar/sidebar.component';
import { ChoiceDialogComponent } from './library/choice-dialog.component';
import { TrainingModule } from './training/training.module';
import { SharedModule } from './library/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { reducers } from './reducers/app.reducer';

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
    StoreModule.forRoot(reducers),
    TrainingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [ AppComponent ],
  entryComponents: [ ChoiceDialogComponent ]
})
export class AppModule { }
