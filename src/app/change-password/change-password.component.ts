import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  static subscribe: any;
  [x: string]: any;
  user: any;
  // user = {
  //   dasId: '',
  //   oldPassword:'',
  //   newPassword:'',
  //   cpassword:''
  // };
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasId: ''
    }
    this.emp = {};
    this.emp.empid = localStorage.getItem('dasId');
    this.isAdmin = localStorage.getItem('Admin');
   }
   onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  
  }
  changePassword(){
    console.log("dasid:",localStorage.getItem('dasId'));
    console.log("old password:",this.user.oldPassword);
    console.log("new password:",this.user.newPassword);
    console.log("Confirm password:",this.user.cpassword);
    
    this.showSpinner = true
  
    if(this.user.oldPassword === undefined || this.user.oldPassword== ''){
      this.toastr.warning('Please enter Old Password');
      this.showSpinner = false
      return; 
    }
    else if(this.user.newPassword === undefined || this.user.newPassword== ''){
      this.toastr.warning('Please enter New Password');
      this.showSpinner = false
      return; 
    }
    else if(this.user.cpassword === undefined || this.user.cpassword== ''){
      this.toastr.warning('Please enter New Confirm Password and must match with new password');
      this.showSpinner = false
      return; 
    }
    else if(this.user.newPassword !== this.user.cpassword) {
      this.toastr.error('Confirm Password must match Password');
      this.showSpinner = false
      return;
    }
    else if(this.user.oldPassword == this.user.newPassword) {
      this.toastr.error('New Password is matching with new Password. Please enter different new password');
      this.showSpinner = false
      return;
    }
    else{
      this.http.post<any>('http://localhost:8080/psa/changePassword',
    {
      "oldpassword":this.user.oldPassword,
      "newpassword":this.user.newPassword,
      "id":localStorage.getItem('dasId')
    }).subscribe(
      data => {
        if (data.statusCode == "201" || data.statusCode == "200") {
          this.toastr.success('Password updated successfully');
          this.router.navigate(['list']);
        }
        else if (data.statusCode == "500") {
          this.toastr.error('Incorrect Old Password!!');
        }
      });
  }
  }

  ngOnInit(): void {
  }

}
