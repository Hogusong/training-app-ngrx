import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: EXERCISE[] = []
  @Output() startTraining = new EventEmitter();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  start(ex) {
    console.log(ex.name);
    this.startTraining.emit();
  }
}
