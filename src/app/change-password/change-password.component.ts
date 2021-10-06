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
   }

  changePassword(){
    console.log("dasid:",localStorage.getItem('dasId'));
    console.log("old password:",this.user.oldPassword);
    console.log("new password:",this.user.newPassword);
    console.log("Confirm password:",this.user.cpassword);

    if(this.user.newPassword !== this.user.cpassword) {
      this.toastr.error('Confirm Password must match Password');
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
          this.toastr.warning('Incorrect Old Password!!');
        }
      });
  }
  }

  ngOnInit(): void {
  }

}
