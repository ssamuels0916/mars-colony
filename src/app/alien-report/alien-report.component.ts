import { Component, OnInit } from '@angular/core';

import { Alien } from '../models';
import  AliensService  from '../services/aliens.service';


@Component({
  selector: 'app-alien-report',
  templateUrl: './alien-report.component.html',
  styleUrls: ['./alien-report.component.css'],
  providers: [AliensService]
})
export class AlienReportComponent implements OnInit {

  marsAliens: Alien[];

  constructor(alienService: AliensService) { 


  alienService.getAlienReport().subscribe((aliens) => {
      this.marsAliens = aliens;
     
  }, (err) => {
    console.log(err);

  });

  }

  ngOnInit() {
  }

}
