import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Alien } from '../models';
import { cantBe } from '../shared/validators';
import  AliensService  from '../services/aliens.service';
import EncountersService from '../services/encounters.service';


@Component({
  selector: 'app-alien-report',
  templateUrl: './alien-report.component.html',
  styleUrls: ['./alien-report.component.css'],
  providers: [AliensService, EncountersService  ]
})
export class AlienReportComponent implements OnInit {

  marsAliens: Alien[];
  alienForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private alienService: AliensService,
              private encountersService: EncountersService) {


      alienService.getAlienReport().subscribe((aliens) => {
      this.marsAliens = aliens;

      }, (err) => {
        console.log(err);
      });

  }

  ngOnInit() {

    this.alienForm = new FormGroup({
    atype: new FormControl(this.NO_ALIEN_SELECTED, [cantBe(this.NO_ALIEN_SELECTED)]),
    action: new FormControl('', [Validators.required, Validators.maxLength(450)])
  });

  }
onSubmit(event, alienForm) {
    //event.preventDefault();
      console.log('button working?');
  }
}
