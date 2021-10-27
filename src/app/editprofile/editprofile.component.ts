import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Created an interface Domain which includes two variables
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
  //showSpinner is set to false
  showSpinner = false;
  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'editprofile';
  signup: any;
  user: any;

  //typeOfDomain which includes 6 Domain's in the Domain list
  typeOfDomain: Domain[] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' }
  ];

  //
  employee = {
    "id": {
      "dasId": ""
    },
    "employeeId": "",
    "name": "",
    "gcmLevel": "",
    "mobile": "",
    "email": "",
    "reportingManager": "",
    "projectName": "",
    "jobRole": "",
    "domain": ""
  }

  //created new FormGroup i.e. editCustomer and assigned new Control's
  editCustomer = new FormGroup({
    employeeId: new FormControl(''),
    name: new FormControl(''),
    gcmLevel: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    reportingManager: new FormControl(''),
    projectName: new FormControl(''),
    domain: new FormControl(''),
    jobRole: new FormControl(''),
  })

  dasId: "";
  constructor(private route: ActivatedRoute, private _http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private toastr: ToastrService) {
    //created a formBuilder group
    this.editCustomer = this._formBuilder.group({
      name: ['', Validators.required],
      employeeId: ['', Validators.required],
      gcmLevel: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      reportingManager: ['', Validators.required],
      projectName: ['', Validators.required],
      domain: ['', Validators.required],
      jobRole: ['', Validators.required],
    })
    this.user =
    {
      id: {
        dasId: "string"
      }
    }
    this.emp = {};
    //Getting DasId into Local Storage
    this.emp.empid = localStorage.getItem('dasId');
    //Getting Admin Status into Local Storage
    this.isAdmin = localStorage.getItem('Admin');
  }

  ngOnInit(): void {
    this.dasId = this.emp.empid;
    this.getService(this.dasId);
  }

  onSubmit(form: NgForm) {
    alert("Details Updated Successfuly")
  }

  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }

  //getService() function is to get the specific Employee details 
  getService(dasId: any) {
    //Http get call for communicating with Backend services to get the specific Employee details
    this._http.get("http://localhost:8080/psa/getEmployee/" + dasId, this.route.snapshot.params.id)
      .subscribe(
        (data: any) => {
          this.editCustomer = this._formBuilder.group({
            employeeId: new FormControl(data['employeeId']),
            name: new FormControl(data['name']),
            gcmLevel: new FormControl(data['gcmLevel']),
            mobile: new FormControl(data['mobile']),
            email: new FormControl(data['email'], Validators.email),
            reportingManager: new FormControl(data['reportingManager']),
            projectName: new FormControl(data['projectName']),
            domain: new FormControl(data['domain']),
            jobRole: new FormControl(data['jobRole']),
          })
        });
  }

  //updateService() function is use to edit the specific Employee Detail's 
  updateService() {
    this.showSpinner = true;
    //Http post call for communicating with Backend services to update the specific Employee details
    this._http.post("http://localhost:8080/psa/updateEmployee", this.employee, { responseType: "text" })
      .subscribe(
        (data: any) => {
          //If all condition's are true
          if (data == "Employee Updated Successfuly") {
            this.router.navigate(['list']);
            this.toastr.success("Employee Details Updated Successfully");
            this.showSpinner = false;
          }
          //If all condition's are not true 
          else {
            this.toastr.error("Employee Details Updation Failed");
            this.showSpinner = false
          }
        },
        (err) => {
          alert("Error")
        }
      );
  }

  //edit() function is use to edit the specific Employee Detail's 
  edit() {
    this.employee.id.dasId = this.dasId;
    this.employee.employeeId = this.editCustomer.get("employeeId").value;
    this.employee.name = this.editCustomer.get("name").value;
    this.employee.gcmLevel = this.editCustomer.get("gcmLevel").value;
    this.employee.mobile = this.editCustomer.get("mobile").value;
    this.employee.email = this.editCustomer.get("email").value;
    this.employee.reportingManager = this.editCustomer.get("reportingManager").value;
    this.employee.projectName = this.editCustomer.get("projectName").value;
    this.employee.domain = this.editCustomer.get("domain").value;
    this.employee.jobRole = this.editCustomer.get("jobRole").value;
    this.updateService();
  }
}