import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises = ['Crunches', 'Bike', 'Burpees', 'Swimming', 'Touch Toes']
  @Output() startTraining = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  start(ex) {
    console.log(ex);
    this.startTraining.emit();
  }
}
