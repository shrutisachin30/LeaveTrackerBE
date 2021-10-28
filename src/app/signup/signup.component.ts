import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

//Created an interface Domain which includes two variables
interface Domain {
  value: string;
  viewValue: string;
}
Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //showSpinner is set to false
  showSpinner = false;
  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'signup';
  signup: any;
  user: any;
  apiEndPoint = environment.apiEndPoint;

  //typeOfDomain which includes 6 Domain's in the Domain list
  typeOfDomain: Domain[] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' }
  ];

  constructor(private fb: FormBuilder, private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      employeeId: '',
      countryCode: '+91 '
    }
  }
  ngOnInit(): void {
  }

  showToastr() {
    this.toastr.success('some messages', 'title');
  }

  //In Contact no. field onCountryChange function is used
  onCountryChange(countryCode: any) {
    this.user.countryCode = '+' + countryCode.dialCode + ' ';
  }

  //registration() function is used to fill the form and registration of an Employee
  registration() {
    //After clicking on Submit button, showSpinner is set to true
    console.log("registration")
    this.showSpinner = true

    //If Employee Id field is blank and user click's on Submit button 
    if (this.user.employeeId === undefined || this.user.employeeId == '') {
      this.toastr.error('Please enter valid employeeId');
      this.showSpinner = false
      return;
    }

    //If Das Id field is blank and user click's on Submit button
    if (this.user.dasId === undefined || this.user.dasId == '') {
      this.toastr.error('Please enter valid dasId');
      this.showSpinner = false
      return;
    }

    //If Name field is blank and user click's on Submit button
    if (this.user.name === undefined || this.user.name == '') {
      this.toastr.error('Please enter name');
      this.showSpinner = false
      return;
    }

    //If Password field is blank and user click's on Submit button
    if (this.user.Password === undefined || this.user.Password == '') {
      this.toastr.error('Please Enter password');
      this.showSpinner = false
      return;
    }

    //If Confirm Password field is blank and user click's on Submit button
    if (this.user.cPassword === undefined || this.user.cPassword == '') {
      this.toastr.error('Please Enter Confirm password');
      this.showSpinner = false
      return;
    }

    //If Confirm Password doesn't matches with Password and user click's on Submit button
    if (this.user.Password !== this.user.cPassword) {
      this.toastr.error('Confirm Password must match Password');
      this.showSpinner = false
      return;
    }

    //If Contact no. field is blank and user click's on Submit button
    if (this.user.mobile === undefined || this.user.mobile == '') {
      this.toastr.error('Please enter valid mobile number');
      return;
    }

    //If Email Id field is blank and user click's on Submit button
    if (this.user.emailId === undefined || this.user.emailId == '') {
      this.toastr.error('Please enter valid email');
      this.showSpinner = false
      return;
    }

    //If Reporting Manager field is blank and user click's on Submit button
    if (this.user.reportingManager === undefined || this.user.reportingManager == '') {
      this.toastr.error('Please enter valid Reporting Manager');
      this.showSpinner = false
      return;
    }

    //If Project Name field is blank and user click's on Submit button
    if (this.user.projectName === undefined || this.user.projectName == '') {
      this.toastr.error('Please enter valid ProjectName');
      this.showSpinner = false
      return;
    }

    //If Domain field is blank and user click's on Submit button
    if (this.user.typeOfDomain === undefined || this.user.typeOfDomain == '') {
      this.toastr.error('Please enter valid Domain');
      this.showSpinner = false
      return;
    }

    //If Job Role field is blank and user click's on Submit button
    if (this.user.jobRole === undefined || this.user.jobRole == '') {
      this.toastr.error('Please enter valid jobRole');
      this.showSpinner = false
      return;
    }

    //If both the Field's are filled and user click's on Submit button
    //Http post call for communicating with Backend services
    this._http.post<any>(this.apiEndPoint + 'registerEmployee',
      {
        "id": {
          "dasId": this.user.dasId
        },
        "employeeId": this.user.employeeId,
        "name": this.user.name,
        "email": this.user.emailId,
        "password": this.user.Password,
        "gcmLevel": this.user.gcmLevel,
        "projectName": this.user.projectName,
        "reportingManager": this.user.reportingManager,
        "mobile": this.user.countryCode + this.user.mobile,
        "jobRole": this.user.jobRole,
        "domain": this.user.typeOfDomain,

      }).subscribe(
        data => {
          //If statusCode matches with 201 0r 200
          if (data.statusCode == "201" || data.statusCode == "200") {
            this.toastr.success('Registration successful');
            this.router.navigate(['signin']);
            this.showSpinner = false
          }
          //If statusCode matches with 500
          else if (data.statusCode == "500") {
            this.toastr.error('User already exists');
            this.router.navigate(['signin']);
            this.showSpinner = false
          }
          //If statusCode doesn't match with 200,201 and 500
          else {
            this.toastr.error('Registration unsuccessful');
          }
        },
        //If User already exists 
        err => {
          this.toastr.error('User already exists');
        });
  }

}
