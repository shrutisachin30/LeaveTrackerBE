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


  hide = true;
  title = 'signin';
  user = {
    'dasId' : '',
    'password' : ''
  };

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
  }
  
    ngOnInit(): void {

}
reset(){
  this.user.dasId = '';
  this.user.password = '';
}

login() {
  console.log("Clicking");
  console.log("Clicking", this.user.dasId);
  console.log("Clicking", this.user.password);


  if ((this.user.dasId == '') && (this.user.password == '')) {
    this.toastr.warning('Please enter the username and password');
    return;
  }

  else if((this.user.dasId == '') && (this.user.password == this.user.password)){
    this.toastr.warning('Please enter the username');
    return;
  }

  else if((this.user.dasId == this.user.dasId) && (this.user.password == '')){
    this.toastr.warning('Please enter the password');
    return;
  }

  else{
    this.http.post<any>('http://localhost:8080/psa/loginService',
      {
        "dasId" : this.user.dasId,
        "password" : this.user.password
      }).subscribe(
        data => {
        localStorage.setItem('dasId', this.user.dasId);

          if (data.statusCode == "201") {
            if(data.isActive == "Yes"){

        
            if(data.isAdmin == "Yes"){
              this.toastr.success('Logged in as Admin');
              localStorage.setItem('Admin', "Yes");
              this.router.navigate(['list']);
            }
            else if(data.isAdmin == "No") {
              this.toastr.success('Login successful');
              this.router.navigate(['list']);
            }
            }
            else{
              this.toastr.error('User is deactivated please contact Admin');
            } 
          }

          else if(data.statusCode == "500") {

            this.toastr.error('Login unsuccessful');
            console.log("Signin Credentials");
          }
           console.log("Response", data);

        })

      }

  }
}

