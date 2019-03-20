import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: EXERCISE[] = [];
  @Output() startTraining = new EventEmitter();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.getAvailableExercises().subscribe(res => {
      this.exercises = res;
    },error => { });
  }

  start(ex) {
    this.trainingService.startExercise(ex.id);
    this.startTraining.emit();
  }
}
