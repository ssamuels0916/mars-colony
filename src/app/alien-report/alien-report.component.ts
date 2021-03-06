import { Component, OnInit } from '@angular/core';
import { HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Alien, NewEncounter } from '../models';
import { cantBe } from '../shared/validators';
import  AliensService  from '../services/aliens.service';
import EncountersService from '../services/encounters.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-alien-report',
  templateUrl: './alien-report.component.html',
  styleUrls: ['./alien-report.component.css'],
  providers: [AliensService, EncountersService],
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
export class AlienReportComponent implements OnInit {
@HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }
  marsAliens: Alien[];
  alienForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(private alienService: AliensService,
              private encountersService: EncountersService,
              private router: Router) {


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
   private getDate(){
      const d  = new Date();
      return `${d.getFullYear()} - ${d.getMonth() + 1} - ${d.getDate()}`;
  }

  onSubmit(event) {
      event.preventDefault();
      console.log('button working?');

      
      const date = this.getDate();
      // data from API
      const atype = this.alienForm.get('atype').value;
      const action = this.alienForm.get('action').value;
      
      const colonist_id = localStorage.getItem("colonist_id");
      const encounter = new NewEncounter(atype, date, action, colonist_id);
      this.encountersService.submitEncounter(encounter).subscribe(() => {
        this.router.navigate(['/encounter']);
        console.log('success');
      
    } , (err) => {
        console.log(err);
      });
    
  }
}
