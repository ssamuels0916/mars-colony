import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { HostBinding,
         trigger, transition, animate,
         style, state } from '@angular/core';
import { NewColonist, Job } from '../models';
import { cantBe } from '../shared/validators';
import  JobsService  from '../services/jobs.service';
import  ColonistsService  from '../services/colonists.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService, ColonistsService],
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
          transform: 'translateY(-100%)'
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
export class RegisterComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }
// declare data types here
  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';



  constructor(private jobService: JobsService,
        private colonistService: ColonistsService,
        private router: Router) {

    jobService.getJobs().subscribe((jobs) => {
        this.marsJobs = jobs;
    }, (err) => {
      console.log(err);

    });
}



tooOld(value: number): ValidatorFn {
return (control: AbstractControl): {[key: string]: any} => {
  return control.value > 100 ? {'too old': {value}} : null;
};

}
  ngOnInit() {

  this.registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    job_id: new FormControl('(none)', [cantBe(this.NO_JOB_SELECTED)])
  });

  }


  onSubmit(event) {
    event.preventDefault();
    if (this.registerForm.invalid) {
      // the form is invalid...
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;
      
      
      const colonist = new NewColonist(name, job_id, age);
      
      this.colonistService.submitColonist(colonist).subscribe((response) => {
        localStorage.setItem("colonist_id", JSON.stringify(response.id));
        this.router.navigate(['/encounter']);
        console.log('success');
        
      
    } , (err) => {
        console.log(err);
      });
    }
    
  }
}