import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { UploadService } from './../uploadData.service'


@Component({
  selector: 'app-uploadData-list',
  templateUrl: './uploadData-list.component.html',
  styleUrls: ['./uploadData-list.component.css'],
  providers: [UploadService]

})


export class uploadDataListComponent implements OnInit {

  @Input() courseId: number;
  @Input() groupId: number;
  @Input() indicatorId: number;
  @Input() periodType: string;
  @Input() evaluationType: string;
  @Input() activityType: string;

  flagGrades = false;
  gradesList;

  constructor(
    private service: UploadService
  ) { 
    this.gradesList = [];
  }

  ngOnInit() {
      
  }

  ngOnChanges(){
    
    if(this.courseId != null && this.groupId != null && this.indicatorId != null && this.periodType != null && this.evaluationType != null && this.activityType != null){
      this.service.getDataVerification(this.periodType, this.indicatorId, this.courseId, this.groupId, this.evaluationType,this.activityType)
      .subscribe(
        rs => this.gradesList = rs,
        er => console.log(er),
        () => {
            console.log(this.gradesList);
            if(this.gradesList.length > 0){
              this.flagGrades = true;
            }else{
              this.flagGrades = false;
            }

        })
    }
  }

}
