import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    this.emp.empid = localStorage.getItem('dasId');
    this.isAdmin = localStorage.getItem('Admin');
  }

  ngOnInit(): void {

  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  
  }
    getDate(){   
     var date:any = new Date();       
     var today:any = date.getDate();    
    if(today < 10){      today = '0'+ today;    }    
    var month:any = date.getMonth() + 1;    
     if(month < 10){      month = '0'+ month;    }    
    var year:any = date.getFullYear();    
    this.minDate = year + '-' + month + '-' + today;  
  }
  
  
  pad2(n:any) {
    return (n < 10 ? '0' : '') + n;
  }

  applyLeaveEmployee() {

    console.log("this.user", this.user.startDate);
    console.log("this.user", this.user.endDate);
    console.log("this.user", this.user.typeOfLeave);
    console.log("this.user", this.user.updatedBy);
    console.log("this.user", this.user.updatedOn);
    console.log("this.user", localStorage.getItem('dasId'));

    //  if (this.user.startDate === undefined || this.user.startDate == '') {
    //    this.toastr.error('Please select valid Start Date');
    //    return;
    //  }

    //  if (this.user.endDate === undefined || this.user.endDate == '') {
    //    this.toastr.error('Please select valid End Date');
    //    return;
    //  }

    if (this.user.startDate === undefined && this.user.endDate === undefined) {
      this.toastr.error('Please select Start Date and End Date');
      return;
    }

    else if (this.user.startDate == this.user.startDate && this.user.endDate == undefined) {
      this.toastr.error('Please select End Date');
      return;
    }

    if (this.user.startDate > this.user.endDate) {
      this.toastr.error('End Date should be greater than Start Date.');
      return;
    }

    if (this.user.typeOfLeave === undefined || this.user.typeOfLeave == '') {
      this.toastr.error('Please enter type of leave');
      return;
    }


    
    var sDate = new Date(this.user.startDate);
    
    var month = this.pad2(sDate.getMonth() + 1);//months (0-11)
    var day = this.pad2(sDate.getDate());//day (1-31)
    var year = sDate.getFullYear();

    var startFormattedDate = day + "-" + month + "-" + year;
    console.log(startFormattedDate);
    
    var eDate = new Date(this.user.endDate);
    var month = this.pad2(eDate.getMonth() + 1);//months (0-11)
    var day = this.pad2(eDate.getDate());//day (1-31)
    var year = eDate.getFullYear();

    var endFormattedDate = day + "-" + month + "-" + year;
    console.log(endFormattedDate);

    var uOn = new Date();
    var month = this.pad2(uOn.getMonth() + 1);//months (0-11)
    var day = this.pad2(uOn.getDate());//day (1-31)
    var year = uOn.getFullYear();

    var uOnFormattedDate = day + "-" + month + "-" + year;
    console.log(uOnFormattedDate);


    this._http.post<any>('http://localhost:8080/psa/applyLeave',
      {
        "employee": {
          "id": localStorage.getItem('dasId')
        },
        "startDate": startFormattedDate,
        "endDate": endFormattedDate,
        "typeOfLeave": this.user.typeOfLeave,
        "updatedBy":localStorage.getItem('dasId'),
        "updatedOn":uOnFormattedDate
      }).subscribe(
        data => {
          if (data.statusCode == "201" || data.statusCode == "200") {
            this.toastr.success('Leave applied successfully');
            localStorage.setItem('viewId',this.emp.empid);
            this.router.navigate(['view']);
          }
          else if (data.statusCode == "500") {
            this.toastr.warning('Leave for these dates already applied, Please Select new dates');
            
          }
          else {
            this.toastr.error('Leave application unsuccessful');
            
          }

        });

  }
}