import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})

export class ForgotpasswordComponent implements OnInit {

  showSpinner = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  redirectflag = false;
  pswdresetstatus = "";
  statusCode: any;
  stepper: any;
  otp: any;
  user: any;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) {
    //creating a formbuilder group for firstFormGroup
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]]
    });
    //creating a formbuilder group for secondFormGroup
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });
    //creating a formbuilder group for thirdFormGroup
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,10}$")]],
      thirdCtrlcpass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern("^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,10}$")]]
    });
  }

  //to get the firstFormGroup controls into form1
  get form1() {
    return this.firstFormGroup.controls;
  }
  //to get the secondFormGroup controls into form2
  get form2() {
    return this.secondFormGroup.controls;
  }
  //to get the thirdFormGroup controls into form3
  get form3() {
    return this.thirdFormGroup.controls;
  }

  //getdasId() function is use to get the das Id and check weather it exist's or not
  getdasId(stepper: MatStepper) {
    this.showSpinner = true;
    this.stepper = stepper;
    let dasId = this.form1.firstCtrl.value;
    //Http get call for communicating with Backend services
    this.http.get<any>("http://localhost:8080/psa/forgotPassword/" + dasId).subscribe(
      response => {
        //If all the Condition's are true
        if (response.statusCode == "201" || response.statusCode == "200") {
          this.toastr.success('OTP has been send on your register mail Id');
          localStorage.setItem('dasId:', this.form1.firstCtrl.value);
          this.otp = response.otp;
          this.showSpinner = false;
          this.stepper.next();
        }
        //If das Id is not registered
        else if (response.statusCode == "500") {
          this.toastr.error('Your dasid is not registered');
        }
      });
  }

  //this function is used to validate the secret key
  validateKey() {
    this.showSpinner = true;
    //If otp is correct
    if (this.otp === this.form2.secondCtrl.value) {
      this.toastr.success('OTP validated');
      this.showSpinner = false;
      this.stepper.next();
    }
    //If otp is incorrect
    else {
      this.toastr.error('Invalid OTP');
    }
  }

  //this function is used to update the new password
  updatePassword() {
    this.showSpinner = true;
    //if Confirm Password doesn't match with password
    if (this.form3.thirdCtrl.value !== this.form3.thirdCtrlcpass.value) {
      this.toastr.error('Confirm Password must match Password');
      this.showSpinner = false
      return;
    }
    //if Confirm Password matches with password
    else {
      //Http post call for communicating with Backend services
      this.http.post<any>('http://localhost:8080/psa/updatePassword',
        {
          "id": this.form1.firstCtrl.value,
          "password": this.form3.thirdCtrl.value
        }).subscribe(
          data => {
            //If ll conditions are true
            if (data.statusCode == "201" || data.statusCode == "200") {
              this.toastr.success('Password updated successfully');
              this.showSpinner = false;
              this.stepper.next();
            }
            else if (data.statusCode == "500") {
              this.toastr.warning('Password could not update');
            }
          });
    }
  }
  ngOnInit(): void {
    //to reset all the form
    this.firstFormGroup.reset()
    this.secondFormGroup.reset()
    this.thirdFormGroup.reset()
  }
}