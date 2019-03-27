import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private loadingSubject = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) { }

  getLodaingSubject() {
    return this.loadingSubject.asObservable();
  }

  setLoadingSubject(value) {
    this.loadingSubject.next(value);
  }

  openSnackbar(msg, action, duration) {
    this.snackbar.open(msg, action, {
      duration: duration,  panelClass: ['snack-bar'] 
    });
  }
}
