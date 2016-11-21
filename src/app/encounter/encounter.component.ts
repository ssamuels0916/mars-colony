import { Component, OnInit } from '@angular/core';
import { HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { Encounter } from '../models';
import  EncountersService  from '../services/encounters.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css'],
  providers: [EncountersService],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0%)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class EncounterComponent implements OnInit {
@HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }
  marsEncounters: Encounter[];


  constructor(private encounterService: EncountersService) {

    encounterService.getEncounters().subscribe((encounters) => {
        this.marsEncounters = encounters;
        

    }, (err) => {
      console.log(err);

    });

  }
  onSubmit(event) {
  event.preventDefault();
  
}

  ngOnInit() {
  }

}
