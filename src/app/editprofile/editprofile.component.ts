import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
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



  typeOfDomain: Domain[] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' }
  ];

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
    this.emp.empid = localStorage.getItem('dasId');
  }




  ngOnInit(): void {
    this.dasId = this.emp.empid;
    this.getService(this.dasId);

  }

  onSubmit(form: NgForm) {
    console.log(form);
    alert("Details Updated Successfuly")
  }

  getService(dasId: any) {

    this._http.get("http://localhost:8080/psa/getEmployee/" + dasId, this.route.snapshot.params.id)
      .subscribe(
        (data: any) => {
          this.editCustomer = this._formBuilder.group({

            employeeId: new FormControl(data['employeeId']),
            name: new FormControl(data['name']),
            gcmLevel: new FormControl(data['gcmLevel']),
            mobile: new FormControl(data['mobile'], [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
            email: new FormControl(data['email'], Validators.email),
            reportingManager: new FormControl(data['reportingManager']),
            projectName: new FormControl(data['projectName']),
            domain: new FormControl(data['domain']),
            jobRole: new FormControl(data['jobRole']),
          })

        });
  }
  updateService() {

    this._http.post("http://localhost:8080/psa/updateEmployee", this.employee, { responseType: "text" })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data == "Employee Updated Successfuly") {
            this.toastr.success("Employee Details Updated Successfully");
            this.showSpinner = false;
            this.router.navigate(['list']);
          } else {
            this.toastr.error("Employee Details Updation Failed");
            this.showSpinner = false
          }
        },
        (err) => {
          alert("Error")
        }
      );

  }

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
    console.log(this.employee);
  }


}