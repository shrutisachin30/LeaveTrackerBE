import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
 

  typeOfDomain: Domain[] = [
    { value: 'ASCV', viewValue: 'ASCV' },
    { value: 'SECV', viewValue: 'SECV' },
    { value: 'ISEA', viewValue: 'ISEA' },
    { value: 'PSMC', viewValue: 'PSMC' },
    { value: 'BSCV', viewValue: 'BSCV' },
    { value: 'RSCV', viewValue: 'RSCV' }
  ];
  
  displayedColumns: string[] = ['dasId', 'name', 'gcmLevel', 'domain', 'startDate', 'endDate', 'status', 'typeOfLeave'];
dataSource=this.list
data: MatTableDataSource<any>;
  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasId: ''
    }

    this.emp = {};
    this.emp.empid = localStorage.getItem('dasId');
  }
  pad2(n:any) {
    return (n < 10 ? '0' : '') + n;
  }
  getExport() {
    this.isDataPresent = false;
    if (this.user.typeOfDomain === undefined && this.user.typeOfDomain === undefined) {
      this.toastr.warning('Please select Domain type');
      return;
    }
    else if (this.user.startDate === undefined && this.user.endDate === undefined) {
      this.toastr.warning('Please select Start Date and End Date');
      return;
    }
    else if (this.user.startDate === undefined) {
      this.toastr.warning('Please select Start Date');
      return;
    }
    else if (this.user.startDate == this.user.startDate && this.user.endDate == undefined) {
      this.toastr.warning('Please select End Date');
      return;
    }
    else if (this.user.startDate > this.user.endDate) {
      this.toastr.error('End Date should be greater than Start Date.');
      return;
    }

    let domain = this.user.typeOfDomain
    console.log("domain:",domain);
    
    let startDate = this.user.startDate + " 00:00:00"
    console.log("startDate:",startDate);

    let endDate = this.user.endDate+ " 00:00:00"
    console.log("endDate:",endDate);

    this._http.get<any>('http://localhost:8080/psa/exportData/' + domain + '/'+startDate +'/'+endDate).subscribe(
      res => {
        this.list = res
        console.log("list:",this.list.length)
        this.dataSource=this.list;
        if(this.list.length > 0){
          this.isDataPresent = true;
          console.log(this.isDataPresent)

        }
        else{
          this.toastr.error('Data not present');
        }

        this.data = new MatTableDataSource<any>(this.list);
        
      }
    )
  }

  ngOnInit(): void {
    
  }
}