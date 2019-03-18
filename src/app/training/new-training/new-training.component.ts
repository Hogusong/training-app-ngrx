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

  exercises: Observable<any>;
  @Output() startTraining = new EventEmitter();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises()
  }

  start(ex) {
    this.trainingService.startExercise(ex.id);
    this.startTraining.emit();
  }
}
