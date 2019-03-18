import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { EXERCISE } from 'src/app/models';
import { TrainingService } from 'src/app/providers/training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<EXERCISE>()
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastExercises();
  }

}
