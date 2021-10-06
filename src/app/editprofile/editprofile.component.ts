import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface Domain {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  showSpinner = false;
  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'editprofile';
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
      dasId: ''
    }
    this.emp = {};
    this.emp.empid = localStorage.getItem('dasId');

 }

  ngOnInit(): void {
  }

  edit(){
    
  }

}


