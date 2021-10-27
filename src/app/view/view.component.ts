import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, RouterEvent } from '@angular/router';
import { DialogService } from '../dialog.service';

Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {
  title = "view";
  showSpinner = false;
  url = "http://localhost:8080/psa/";
  //Getting ViewId from Local Storage
  viewDasId: any = localStorage.getItem('viewId');
  isCancel: any = true;
  //Getting DasId from Local Storage
  empid = localStorage.getItem('dasId');

  CL = 0;
  SL = 0;
  VL = 0;

  displayedColumns: string[] = ['id', 'startdate', 'enddate', 'typeOfLeave', 'status', 'noOfDays', 'updatedBy', 'updatedOn', 'view'];
  canceldata = {
    startdate: "",
    enddate: "",
    dasid: "",
    //Getting Name from Local Storage
    updatedBy: localStorage.getItem('name'),
    updatedOn: new Date(),
  }

  length = 0;

  dataSource = [{
    id: 0,
    startDate: "",
    endDate: "",
    status: "",
    typeOfLeave: "",
    noOfDays: "",
    updatedBy: "",
    updatedOn: "",
    disable: false,
  }];
  //Getting DasId(ViewId) from Local Storage
  dasid: any = localStorage.getItem('viewId');

  //@ViewChild decorator to access template reference variable inside the component.
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  data: MatTableDataSource<any>;
  isAdmin: any;

  constructor(private dialogservice: DialogService, private http: HttpClient, private router: Router) {
    this.id = 1;
    this.viewDasId = localStorage.getItem('viewId');
    this.getLeaves(this.viewDasId).subscribe((res: any) => {
      this.dataSource = res;
      this.fun();
      this.length = this.dataSource.length;
      this.data.paginator = this.paginator;
    });
    //Getting Admin Status from Local Storage
    this.isAdmin = localStorage.getItem('Admin');
  }
  id: any;


  ngOnInit(): void {
    //ViewId is equal to DasId
    if (this.viewDasId != this.empid) {
      this.isCancel = true;
    }
    //ViewId is not equal to DasId
    else {
      this.isCancel = false;
    }
  }

  //getLeaves() funtion is used to display the List of Leaves
  getLeaves(id: String): any {
    //Getting ViewId from Local Storage
    let Id = localStorage.getItem('viewId');
    //Http get call for communicating with Backend services to get the list of Leaves from BackEnd
    return this.http.get(this.url + "retrieveLeaveData/" + Id);
  }

  pad2(n: any) {
    return (n < 10 ? '0' : '') + n;
  }
  //cancelLeave() function is use to cancel the leaves of any Employee
  cancelLeave(id: any, startdate: any, enddate: any, updatedBy: any, updatedOn: any) {
    var uOn = new Date();
    var month = this.pad2(uOn.getMonth() + 1);//months (0-11)
    var day = this.pad2(uOn.getDate());//day (1-31)
    var year = uOn.getFullYear();
    var uOnFormattedDate: any = day + "-" + month + "-" + year;
    this.dialogservice.openConfirmDialog('Are you sure you want to Cancel?').afterClosed().subscribe(res => {
      if (res) {
        this.showSpinner = true;
        this.canceldata.dasid = (this.dasid);
        this.canceldata.startdate = startdate;
        this.canceldata.enddate = enddate;
        //Http post call for communicating with Backend services to cnacel the Leaves 
        this.http.post(this.url + "cancelLeave", this.canceldata).subscribe();
        window.location.reload();
      }
    })
  }

  //calculateDiff() function is to calculate difference between End Date and Start Date
  calculateDiff(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var diff = Math.floor((Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  }

  //fun() function is used to display the main list of leaves as well as calculate number of days of sick leaves, casual leaves and vacational leaves
  fun() {
    //for loop of dataSource
    for (let l of this.dataSource) {
      l.noOfDays = this.calculateDiff(l.startDate, l.endDate).toString();
      var typeOfLeave = l.typeOfLeave.toString();
      var status = l.status.toString();
      l.id = this.id++;

      if ((status.includes('Applied') || status.includes('Availed')) && typeOfLeave.includes('Sick Leave')) {
        this.SL += this.calculateDiff(l.startDate, l.endDate);
      }

      if ((status.includes('Applied') || status.includes('Availed')) && typeOfLeave.includes('Casual Leave')) {
        this.CL += this.calculateDiff(l.startDate, l.endDate);
      }

      if ((status.includes('Applied') || status.includes('Availed')) && typeOfLeave.includes('Vacational Leave')) {
        this.VL += this.calculateDiff(l.startDate, l.endDate);
      }

      if (status.includes('cancelled') || new Date(l.startDate) < new Date()) {
        l.disable = true;
      }

      else if (status.includes('Applied') && new Date(l.startDate) >= new Date()) {
        l.disable = false;
      }

      if (this.viewDasId != this.empid) {
        l.disable = true;
      }

      if (this.isAdmin) {
        l.disable = false;
        if (status.includes('cancelled')) {
          l.disable = true;
        }
      }
    }
    this.data = new MatTableDataSource<any>(this.dataSource);

  }
  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);

  }
}