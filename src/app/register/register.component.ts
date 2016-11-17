import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { NewColonist, Job } from '../models';
import { cantBe } from '../shared/validators';
import  JobsService  from '../services/jobs.service';






@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [JobsService]
})
export class RegisterComponent implements OnInit {

// declare data types here
  colonist: NewColonist;
  marsJobs: Job[];
  registerForm: FormGroup;

  NO_JOB_SELECTED = '(none)';



  constructor(public jobService: JobsService) {

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
    job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
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
      console.log('ok, let us register this new colonist:', new NewColonist(name, age, job_id));

    }
  }
}