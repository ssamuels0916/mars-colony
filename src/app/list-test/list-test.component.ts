import { Component, OnInit } from '@angular/core';

// define data by name
class Apple {
  constructor(
    public name: string,
    public colour: string
) {}

}


@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {

  appleList: [Apple]; //list
  apple: Apple; //form
    
  constructor() { 
    this.apple = {name: '', colour: ''};
  this.appleList = [
  {name: 'Granny Smith', colour: 'green' },
  {name: 'Delicious', colour: 'Deep Red'},
  {name: 'Crab', colour: 'Crab'}
  ];
}
addApple() {
this.appleList.push(this.apple);
this.apple = {name: '', colour: ''};

}
// renderAppleForm(appleForm){
//   console.log(appleForm);
// }

  ngOnInit() {
  }

}
