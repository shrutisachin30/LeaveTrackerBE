import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  showSpinner = false;
  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'signup';
  signup: any;
  user: any;

  typeOfDomain: Domain [] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' }       
  ];
  
  constructor(private fb: FormBuilder, private _http: HttpClient,private router: Router,private toastr: ToastrService) {
    this.user = {
       employeeId: ''
     }

 }

 showToastr(){
  this.toastr.success('some messages', 'title');
}

  ngOnInit(): void {
  }

registration()
{
  this.showSpinner = true
  
  if(this.user.employeeId === undefined || this.user.employeeId== ''){
    this.toastr.error('Please enter valid employeeId');
    this.showSpinner = false
    return;
    
  }

  if(this.user.dasId === undefined || this.user.dasId== ''){
    this.toastr.error('Please enter valid dasId');
    this.showSpinner = false
    return;
  }

  if(this.user.name === undefined || this.user.name == ''){
    this.toastr.error('Please enter name');
    this.showSpinner = false
    return;
  }
  
  // if(this.user.dasId !== this.user.username) {
  //   this.toastr.error('Please enter dasId as username');
  //   return;
  // }
  // if(this.user.gcmLevel === undefined || this.user.gcmLevel == ''){
  //   this.toastr.error('Please enter valid GCM Level');
  //   return;
  // }
 
  if(this.user.Password === undefined  || this.user.Password == ''){
    this.toastr.error('Please Enter password');
    this.showSpinner = false
    return;
  }
  if(this.user.cPassword === undefined  || this.user.cPassword == '') {
    this.toastr.error('Please Enter Confirm password');
    this.showSpinner = false
      return;
    }
    if(this.user.Password !== this.user.cPassword) {
      this.toastr.error('Confirm Password must match Password');
      this.showSpinner = false
      return;
    }
    if(this.user.mobile === undefined  || this.user.mobile == '')
    {
      this.toastr.error('Please enter valid mobile number');
      return;
    }
    if(this.user.emailId === undefined  || this.user.emailId == '')
    {
      this.toastr.error('Please enter valid email');
      this.showSpinner = false
      return;
    }
    if(this.user.reportingManager === undefined  || this.user.reportingManager == '')
    {
      this.toastr.error('Please enter valid Reporting Manager');
      this.showSpinner = false
      return;
    }
    if(this.user.projectName === undefined  || this.user.projectName == ''){
      this.toastr.error('Please enter valid ProjectName');
      this.showSpinner = false
      return;
    }

    if(this.user.typeOfDomain === undefined  || this.user.typeOfDomain == ''){
      this.toastr.error('Please enter valid Domain');
      this.showSpinner = false
      return;
    }

    if(this.user.jobRole === undefined  || this.user.jobRole == ''){
      this.toastr.error('Please enter valid jobRole');
      this.showSpinner = false
      return;
    }

    this._http.post<any>('http://localhost:8080/psa/registerEmployee',
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
      "mobile":this.user.mobile,
      "jobRole":this.user.jobRole,
      "domain":this.user.typeOfDomain,
     
    }).subscribe(
      data => {
        console.log(data.status);
        if(data.statusCode == "201" || data.statusCode == "200") {
          this.toastr.success('Registration successful');
          this.router.navigate(['signin']);
          this.showSpinner = false
        } else if( data.statusCode == "500"){
          this.toastr.error('User already exists');
          this.router.navigate(['signin']);
          this.showSpinner = false
        }
        else 
        {
          this.toastr.error('register unsuccessful');
          
        }

      },err =>{
        this.toastr.error('user already exists');
      });
}

}
