import { Component, OnInit } from '@angular/core';

// define data by name
interface Apple {
  type: string;
  colour: string;

}
@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css']
})
export class ListTestComponent implements OnInit {
  appleList: [Apple];
    
  constructor() { 
  this.appleList = [
  {type: 'Granny Smith', colour: 'green' },  
  {type: 'Delicious', colour: 'Deep Red'},
  {type: 'Crab', colour: 'Crab'}
  ];
}
addApple() {
  const apple = { type: 'Macintosh', colour: 'Red'};
  this.appleList.push(apple);
}




  ngOnInit() {
  }

}
