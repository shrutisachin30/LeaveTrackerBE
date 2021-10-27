import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent implements OnInit {
  user: any;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasId: ''
    }
  }

  //deactivate() function is used to deactivate the Employee
  deactivate() {
    //If Das Id field is Blank
    if (this.user.dasId === undefined || this.user.dasId == '') {
      this.toastr.error('Please enter valid dasId');
      return;
    }
    //Http post call for communicating with Backend services
    this.http.post<any>('http://localhost:8080/psa/deactivateEmployee',
      {
        "dasid": this.user.dasId,
        "isActive": "Inactive",
        "df": "Active"
      }).subscribe(
        data => {
          //If all the Condition's are true
          if (data.statusCode == "201" || data.statusCode == "200") {
            this.toastr.success('Employee Deactivated');
            this.router.navigate(['list']);
          }
          //If Employee is already deactivated
          else if(data.statusMsg === "Operation already performed") {
            this.toastr.warning('Employee is already Deactivated');
          }
          //If Das Id is not registered
          else{
            this.toastr.warning('Employee is not registered');
          }
        });
  }

  //activate() function is used to activate the Employee
  activate() {
    //If Das Id field is Blank
    if (this.user.dasId === undefined || this.user.dasId == '') {
      this.toastr.error('Please enter valid dasId');
      return;
    }
    //Http post call for communicating with Backend services
    this.http.post<any>('http://localhost:8080/psa/deactivateEmployee',
      {
        "dasid": this.user.dasId,
        "isActive": "Active",
        "df": "Inactive"
      }).subscribe(
        data => {
          //If all the Condition's are true
          if (data.statusCode == "201" || data.statusCode == "200") {
            this.toastr.success('Employee Activated');
            this.router.navigate(['list']);
          }
          //If Employee is already Activated
          else if(data.statusMsg == "Operation already performed") {
            this.toastr.warning('Employee is already Activated');
          }
          //If Das Id is not registered
          else {
            this.toastr.warning('DasId is not registered');
          }
        });
  }

  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }
  
  ngOnInit(): void {
  }

}
