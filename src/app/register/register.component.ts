import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,ValidatorFn, AbstractControl } from '@angular/forms';
import { NewColonist, Job } from '../models';
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

 cantBe(value: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
  return control.value === value ? {'cant be none': {value}} : null;
  };
}
  ngOnInit() {

  this.registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    job_id: new FormControl('(none)', [this.cantBe(this.NO_JOB_SELECTED)])
  });

  }


  onSubmit(event, registerForm) {
    event.preventDefault();
  }
}