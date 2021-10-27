import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  //hide is a variable used for Password feild in html for visibility icon
  hide = true;
  title = 'signin';
  user = {
    'dasId': '',
    'password': ''
  };

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void { }

  //reset() function is used to clear the DasId and Password Field's
  reset() {
    this.user.dasId = '';
    this.user.password = '';
  }

  //login() function is used to login into the actual application
  login() {

    //If both the field's are empty and user click's on Login button
    if ((this.user.dasId == '') && (this.user.password == '')) {
      this.toastr.warning('Please enter the username and password');
      return;
    }

    //If DasId field is empty and user click's on Login button
    else if ((this.user.dasId == '') && (this.user.password == this.user.password)) {
      this.toastr.warning('Please enter the username');
      return;
    }

    //If Password field is empty and user click's on Login button
    else if ((this.user.dasId == this.user.dasId) && (this.user.password == '')) {
      this.toastr.warning('Please enter the password');
      return;
    }

    //If both the Field's are filled and user click's on Login button
    else {
      //Http post call for communicating with Backend services
      this.http.post<any>('http://localhost:8080/psa/loginService',
        {
          "dasId": this.user.dasId,
          "password": this.user.password
        }).subscribe(
          data => {
            //Saving DasId into Local Storage
            localStorage.setItem('dasId', this.user.dasId);
            //Saving Name into Local Storage
            localStorage.setItem('name', (data.name+' '+'('+this.user.dasId+')'));
            if (data.statusCode == "201") {
              if (data.isActive == "Active") {

                //If user is Admin
                if (data.isAdmin == "Yes") {
                  
                  localStorage.setItem('Admin', "Yes");
                  this.router.navigate(['list']);
                  this.toastr.success('Logged in as Admin');
                }

                //If user is not Admin just an employee
                else if (data.isAdmin == "No") {
                  this.toastr.success('Login successful');
                  this.router.navigate(['list']);
                }
              }

              //If user is deactivated
              else {
                this.toastr.error('User is deactivated please contact Admin');
              }
            }

            //If DasId or Password is wrong
            else if (data.statusCode == "500") {
              this.toastr.error('Login unsuccessful');
            }
          })

    }

  }
}