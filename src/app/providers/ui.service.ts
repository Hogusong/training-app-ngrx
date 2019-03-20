import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  private loadingSubject = new Subject<boolean>();

  constructor() { }

  getLodaingSubject() {
    return this.loadingSubject.asObservable();
  }

  setLoadingSubject(value) {
    this.loadingSubject.next(value);
  }
}
