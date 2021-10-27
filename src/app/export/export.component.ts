import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//Created an interface Domain which includes two variables
interface Domain {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  static subscribe: any;
  [x: string]: any;
  isDataPresent: any
  res: any;

  //typeOfDomain which includes 6 Domain's and 'All' option in the Domain list
  typeOfDomain: Domain[] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' },
    { value: 'All', viewValue: 'All' }
  ];
  //Column's are displayed in the way mentioned in displayedColumns: string[], in web browser on web page
  displayedColumns: string[] = ['dasId', 'name', 'gcmLevel', 'mobile', 'reportingManager', 'domain', 'startDate', 'endDate', 'noOfDays', 'status', 'typeOfLeave', 'isActive'];
  dataSource = this.list
  data: MatTableDataSource<any>;
  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasId: ''
    }
    this.emp = {};
    this.emp.empid = localStorage.getItem('dasId');
  }

  pad2(n: any) {
    return (n < 10 ? '0' : '') + n;
  }
  //getExport() function is used to get the Leave Details of All the Employee's
  getExport() {
    this.isDataPresent = false;
    //if Domain field is blank
    if (this.user.typeOfDomain === undefined && this.user.typeOfDomain === undefined) {
      this.toastr.warning('Please select Domain type');
      return;
    }
    //if start Date field and End Date is blank
    else if (this.user.startDate === undefined && this.user.endDate === undefined) {
      this.toastr.warning('Please select Start Date and End Date');
      return;
    }
    //if start Date field is blank
    else if (this.user.startDate === undefined) {
      this.toastr.warning('Please select Start Date');
      return;
    }
    //if end Date field is blank
    else if (this.user.startDate == this.user.startDate && this.user.endDate == undefined) {
      this.toastr.warning('Please select End Date');
      return;
    }
    //if start Date is greater than end Date
    else if (this.user.startDate > this.user.endDate) {
      this.toastr.error('End Date should be greater than Start Date.');
      return;
    }

    let domain = this.user.typeOfDomain
    let startDate = this.user.startDate + " 05:30:00"
    let endDate = this.user.endDate + " 05:30:00"
    //Http get call for communicating with Backend services to get the list of Employee's Leaves from BackEnd
    this._http.get<any>('http://localhost:8080/psa/exportData/' + domain + '/' + startDate + '/' + endDate).subscribe(
      res => {
        this.list = res
        this.dataSource = this.list;
        //if leaves are present in Employee Leaves list
        if (this.list.length > 0) {
          this.isDataPresent = true;
          this.toastr.success('Click on Download Button');
        }
        //if leaves are not present in Employee Leaves list
        else {
          this.toastr.error('Data not present');
        }
        this.data = new MatTableDataSource<any>(this.list);
      }
    )
  }
  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }
  ngOnInit(): void {
  }

}