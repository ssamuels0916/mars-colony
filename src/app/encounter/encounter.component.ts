import { Component, OnInit } from '@angular/core';

import { Encounter } from '../models';
import  EncountersService  from '../services/encounters.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncountersService]
})

export class EncounterComponent implements OnInit {

  marsEncounters: Encounter[];


  constructor(encounterService: EncountersService) {

    encounterService.getEncounters().subscribe((encounters) => {
        this.marsEncounters = encounters;

    }, (err) => {
      console.log(err);

    });

  }

  ngOnInit() {
  }

}
