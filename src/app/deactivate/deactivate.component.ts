import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DialogService } from '../dialog.service';


@Component({
  selector: 'app-deactivate',
  templateUrl: './deactivate.component.html',
  styleUrls: ['./deactivate.component.css']
})
export class DeactivateComponent implements OnInit {

  user: any;


  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) { 
    this.user = {
      dasId: ''
    }
  }



  deactivate(){
    // this.dialogservice.openConfirmDialog('Are you sure you want to Deactivate the Employee?')
    if(this.user.dasId === undefined || this.user.dasId== ''){
      this.toastr.error('Please enter valid dasId');
    
      return;
    }
   

    this.http.post<any>('http://localhost:8080/psa/deactivateEmployee',

    {
      "dasid":this.user.dasId,
      "isActive":"No",
      "df":"Yes"
    }).subscribe(
      data => {
        if (data.statusCode == "201" || data.statusCode == "200") {
          this.toastr.success('Employee Deactivated');
          this.router.navigate(['list']);
        }
        else if(data.isActive == "No") {
          this.toastr.warning('Employee is already Deactivated');
        }
        else if (data.statusCode == "500") {
          this.toastr.warning('DasId is not registered');
        }
        
        
        
      });

  }

  activate(){
    // this.dialogservice.openConfirmDialog('Are you sure you want to Deactivate the Employee?')
    if(this.user.dasId === undefined || this.user.dasId== '') {
      this.toastr.error('Please enter valid dasId');
      
      return;
    }
   

    this.http.post<any>('http://localhost:8080/psa/deactivateEmployee',

    {
      "dasid":this.user.dasId,
      "isActive":"Yes",
      "df":"No"
    }).subscribe(
      data => {
        if (data.statusCode == "201" || data.statusCode == "200") {
          this.toastr.success('Employee Activated');
          this.router.navigate(['list']);
        }
        else if(data.statusCode == "500" || data.isActive == "Yes") {
          this.toastr.warning('Employee is already Activated');
        }
        else if (data.statusCode == "500") {
          this.toastr.warning('DasId is not registered');
        }
        
        
        
      });

  }

  ngOnInit(): void {
  }

}


// function deactivate() {
//   throw new Error('Function not implemented.');
// }
