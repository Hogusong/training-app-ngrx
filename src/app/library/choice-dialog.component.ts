import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-choice-dialog',
  template: `
    <h1 mat-dialog-title>Are you sure to stop?</h1>
    <mat-dialog-content>
      <p>You already got {{ passedData.progress }} %</p>
    </mat-dialog-content>
    <mat-dialog-actions fxLayoutAlign="center">
      <button mat-button color="accent" [mat-dialog-close]="false">No</button>
      <button mat-button color="primary" [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
  `
})
export class ChoiceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {}
}
