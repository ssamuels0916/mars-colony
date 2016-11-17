import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Alien } from '../models';
import  AliensService  from '../services/aliens.service';

const notNone = (value) =>{

  return value === '(none)' ? false : true;
}

@Component({
  selector: 'app-alien-report',
  templateUrl: './alien-report.component.html',
  styleUrls: ['./alien-report.component.css'],
  providers: [AliensService]
})
export class AlienReportComponent implements OnInit {

  marsAliens: Alien[];
  alienForm: FormGroup;

  constructor(alienService: AliensService) { 


  alienService.getAlienReport().subscribe((aliens) => {
      this.marsAliens = aliens;
     
  }, (err) => {
    console.log(err);

  });

  }

  ngOnInit() {
    this.alienForm = new FormGroup({
    type: new FormControl('', [Validators.required])
  });
  }
onSubmit(event, alienForm) {
    event.preventDefault();
  }
}
