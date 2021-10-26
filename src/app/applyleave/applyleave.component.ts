import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

//Created an interface Leave which includes two variables
interface Leave {
  value: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {
  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'applyleave';
  signup: any;
  user: any;
  maxDate = new Date();

  //typeOfLeaves which includes 3 Leave's in the Leave list
  typeOfLeave: Leave[] = [
    { value: 'Sick Leave', viewValue: 'Sick Leave' },
    { value: 'Casual Leave', viewValue: 'Casual Leave' },
    { value: 'Vacational Leave', viewValue: 'Vacational Leave' }
  ];

  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasId: ''
    }
    this.emp = {};
    //Getting DasId from Local Storage
    this.emp.empid = localStorage.getItem('dasId');
    //Getting Admin status from Local Storage
    this.isAdmin = localStorage.getItem('Admin');
  }

  ngOnInit(): void {
  }

  //gatDate() function is used to get the Date in applyLeaveEmployee() function
  getDate() {
    var date: any = new Date();
    var today: any = date.getDate();
    if (today < 10) { today = '0' + today; }
    var month: any = date.getMonth() + 1;
    if (month < 10) { month = '0' + month; }
    var year: any = date.getFullYear();
    this.minDate = year + '-' + month + '-' + today;
  }

  //If date, month and year are less than '10' then '0' will be appended to it(for e.g:-09)
  pad2(n: any) {
    return (n < 10 ? '0' : '') + n;
  }
  calculateDiff(startDate, endDate){
    startDate = new Date(startDate);
     endDate = new Date(endDate);
     var diff = Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) ) /(1000 * 60 * 60 * 24))+1;
     console.log(diff);
     return diff;
   }

  applyLeaveEmployee() {
    //If Start Date and End Date field is empty
    if (this.user.startDate === undefined && this.user.endDate === undefined) {
      this.toastr.error('Please select Start Date and End Date');
      return;
    }
    //If End Date field is empty
    else if (this.user.startDate == this.user.startDate && this.user.endDate == undefined) {
      this.toastr.error('Please select End Date');
      return;
    }
    //If Start Date is greater than End Date 
    if (this.user.startDate > this.user.endDate) {
      this.toastr.error('End Date should be greater than Start Date.');
      return;
    }
    //If Type Of Leave field is empty
    if (this.user.typeOfLeave === undefined || this.user.typeOfLeave == '') {
      this.toastr.error('Please enter type of leave');
      return;
    }

    var sDate = new Date(this.user.startDate);
    var month = this.pad2(sDate.getMonth() + 1);//months (0-11)
    var day = this.pad2(sDate.getDate());//day (1-31)
    var year = sDate.getFullYear();
    var startFormattedDate = day + "-" + month + "-" + year;

    var eDate = new Date(this.user.endDate);
    var month = this.pad2(eDate.getMonth() + 1);//months (0-11)
    var day = this.pad2(eDate.getDate());//day (1-31)
    var year = eDate.getFullYear();
    var endFormattedDate = day + "-" + month + "-" + year;

    var uOn = new Date();
    var month = this.pad2(uOn.getMonth() + 1);//months (0-11)
    var day = this.pad2(uOn.getDate());//day (1-31)
    var year = uOn.getFullYear();
    var uOnFormattedDate = day + "-" + month + "-" + year;

    

    //Http post call for communicating with Backend services
    this._http.post<any>('http://localhost:8080/psa/applyLeave',
      {
        "employee": {
          "id": localStorage.getItem('dasId')
        },
        "startDate": startFormattedDate,
        "endDate": endFormattedDate,
        "typeOfLeave": this.user.typeOfLeave,
        "noOfDays": this.calculateDiff(this.user.startDate,this.user.endDate),
        //Getting Name from Local Storage
        "updatedBy": localStorage.getItem('name'),
        "updatedOn": uOnFormattedDate
      }).subscribe(
        data => {
          //If all the Condition's are true
          if (data.statusCode == "201" || data.statusCode == "200") {
            this.toastr.success('Leave applied successfully');
            localStorage.setItem('viewId', this.emp.empid);
            this.router.navigate(['view']);
          }
          //If leaves are already applied
          else if (data.statusCode == "500") {
            this.toastr.warning('Leave for these dates already applied, Please Select new dates');
          }
          else {
            this.toastr.error('Leave application unsuccessful');
          }
        });
  }
}