import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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



editCustomer = new FormGroup({
employeeId : new FormControl(''),
name : new FormControl(''),
gcmLevel : new FormControl(''),
mobile : new FormControl(''),
email : new FormControl(''),
reportingManager : new FormControl(''),
projectName : new FormControl(''),
domain : new FormControl(''),
jobRole : new FormControl(''),
})



constructor(private route: ActivatedRoute, private _http: HttpClient, private router: Router,private fb :FormBuilder ,private toastr: ToastrService) {
this.user =
{
id: {
dasId: "string"
}
}
this.emp = {};
this.emp.empid = localStorage.getItem('dasId');
}




ngOnInit(): void {
let dasId = this.emp.empid;

this._http.get("http://localhost:8080/psa/getEmployee/"+ dasId, this.route.snapshot.params.id)
.subscribe(
(data : any) => {
this.editCustomer = new FormGroup({
employeeId : new FormControl(data['employeeId']),
name : new FormControl(data['name']),
gcmLevel : new FormControl(data['gcmLevel']),
mobile : new FormControl(data['mobile']),
email : new FormControl(data['email']),
reportingManager : new FormControl(data['reportingManager']),
projectName : new FormControl(data['projectName']),
domain : new FormControl(data['domain']),
jobRole : new FormControl(data['jobRole']),
})

});
}



edit(){}
}