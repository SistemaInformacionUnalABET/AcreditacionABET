import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-uploadData-list',
  templateUrl: './uploadData-list.component.html',
  styleUrls: ['./uploadData-list.component.css']
})


export class uploadDataListComponent implements OnInit {

  @Input() courseId: number;
  @Input() groupId: number;
  @Input() indicatorId: number;
  @Input() periodType: String;
  @Input() evaluationType: String;
  @Input() activityType: String;

  flagGrades = false;
  gradesList;

  constructor() { 
    this.gradesList = [];
  }

  ngOnInit() {
    
  }

  ngOnChanges(){
    console.log("calcula la tabla");
    
  }

  

}
