import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  showSpinner = false;
  apiEndPoint = environment.apiEndPoint;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
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

  //changePassword() function is used to change the Password
  changePassword() {


    //If Enter Old Password field is empty
    if (this.user.oldPassword === undefined || this.user.oldPassword == '') {
      this.toastr.warning('Please enter Old Password');
      return;
    }
    //If Enter New Password field is empty
    else if (this.user.newPassword === undefined || this.user.newPassword == '') {
      this.toastr.warning('Please enter New Password');
      return;
    }
    //If Enter Confirm Password field is empty
    else if (this.user.cpassword === undefined || this.user.cpassword == '') {
      this.toastr.warning('Please enter Confirm Password and must match with new password');
      return;
    }
    //If Confirm Password doesn't match with New Password
    else if (this.user.newPassword !== this.user.cpassword) {
      this.toastr.error('Confirm Password must match Password');
      return;
    }
    //If Old Password is equal to New Password
    else if (this.user.oldPassword == this.user.newPassword) {
      this.toastr.error('New Password is matching with new Password. Please enter different new password');
      return;
    }
    //If all condition's are correct, all the Field's are filled and user click's on Update button
    else {
      this.showSpinner = true;
      //Http post call for communicating with Backend services
      this.http.post<any>(this.apiEndPoint+'changePassword',
        {
          "oldpassword": this.user.oldPassword,
          "newpassword": this.user.newPassword,
          "id": localStorage.getItem('dasId')
        }).subscribe(
          data => {
            //If all the Condition's are true, it will update the password and redirect to signin page
            if (data.statusCode == "201" || data.statusCode == "200") {
              this.onLogout();
              this.showSpinner = false;
              this.toastr.success('Password updated successfully');
            }
            //If Old Password is Incorrect
            else if (data.statusCode == "500") {
              this.toastr.error('Incorrect Old Password!!');
            }
          });
    }
  }

  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
