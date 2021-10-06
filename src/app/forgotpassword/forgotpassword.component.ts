import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
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
  isLinear = false;
  showSpinner = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  redirectflag = false;
  pswdresetstatus="";
  statusCode:any;
  stepper: any;
  otp:any;
  
  user: any;
  
  constructor(private _formBuilder: FormBuilder,private http:HttpClient,private router: Router, private toastr: ToastrService) { 
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required,Validators.minLength(7), Validators.maxLength(7)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(5)]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(10),Validators.pattern("^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,10}$")]],
      thirdCtrlcpass: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(10),Validators.pattern("^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,10}$")]]
    });
    // this.thirdFormGroup = this._formBuilder.group({
    //   thirdCtrlcpass: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(10),Validators.pattern("^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,10}$")]]
    // });
  }
  get form1() {
    return this.firstFormGroup.controls;
  }
  get form2() {
    return this.secondFormGroup.controls;
  }
  get form3() {
    return this.thirdFormGroup.controls;
  }
  
  getdasId(stepper: MatStepper) {
    
    console.log("DasId",this.form1.firstCtrl.value);
    this.stepper = stepper;
    let dasId = this.form1.firstCtrl.value;
     this.http.get<any>("http://localhost:8080/psa/forgotPassword/"+dasId).subscribe(
      response => { 
        
         if (response.statusCode == "201" || response.statusCode == "200") {
          this.toastr.success('OTP has been send on your register mail Id');
          localStorage.setItem('dasId:', this.form1.firstCtrl.value);

        //localStorage.setItem("otp", response.otp);
        this.otp = response.otp;
          this.stepper.next();
        }
        else if(response.statusCode == "500") {
          this.toastr.error('Your dasid is not registered');
          // this.router.navigate(['signin']);
        }
        console.log("Response:", response);
        console.log("Response:", response.otp);
        
      });
    
  }

  validateKey(){
    console.log("OTP:",this.form2.secondCtrl.value);
    // console.log(localStorage.getItem('Response'));
    console.log('this.otp',this.otp);
    if (this.otp === this.form2.secondCtrl.value) {
      this.toastr.success('OTP validated');
      this.stepper.next();
      
    }
    else{
      this.toastr.error('Invalid OTP');
      
    }
  }

  updatePassword(){
    console.log("Password:",this.form3.thirdCtrl.value);
    console.log(" Confirm Password:",this.form3.thirdCtrlcpass.value);
    
    if(this.form3.thirdCtrl.value !== this.form3.thirdCtrlcpass.value) {
      this.toastr.error('Confirm Password must match Password');
      this.showSpinner = false
      return;
    }
    else{
      this.http.post<any>('http://localhost:8080/psa/updatePassword',
    {
      "id":this.form1.firstCtrl.value,
      "password":this.form3.thirdCtrl.value
    }).subscribe(
      data => {
        if (data.statusCode == "201" || data.statusCode == "200") {
          this.toastr.success('Password updated successfully');
          this.stepper.next();
        }
        else if (data.statusCode == "500") {
          this.toastr.warning('Password could not update');
        }
      });
  }
  }
  ngOnInit(): void {
  // this.getdasId(this.id);
  this.firstFormGroup.reset()
  this.secondFormGroup.reset()
  this.thirdFormGroup.reset()
  }


}