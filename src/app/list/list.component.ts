import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class List {

  constructor(
    public id: {
      dasId: string
    },   
    public name: string,
    public gcmLevel: string,
    public mobile: string,
    public email: string,
    public reportingManager: string,
    public projectName: string,
    public jobRole: string,
    public domain:string
  ) { }

}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  static subscribe: any;
  [x: string]: any;
  successMessage: string | undefined;
  title = 'leave';
  list: List[] = [];
  displayedColumns: string[] = ['dasId', 'name', 'gcmLevel', 'mobile', 'emailId', 'reportingManager', 'domain','projectName', 'jobRole', 'view'];
  dataSource = this.list;
  clickedRows = new Set<List>();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  data: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasid: ''
    }
    this.emp = {};
    this.emp.empid = localStorage.getItem('dasid');
    this.isAdmin = localStorage.getItem('Admin');
  }
  getList() {
    this._http.get<any>('http://localhost:8080/psa/getEmployeeDetails').subscribe(
      response => {
        this.list = response;
       
        

        this.data = new MatTableDataSource<any>(this.list);
        this.data.paginator = this.paginator;
        this.data.sort=this.sort;
        this.data.filterPredicate = 
        (data: any, filter: string) =>((data.name.toLowerCase().indexOf(filter) != -1)|| (data.dasId.toLowerCase().indexOf(filter) != -1));
        console.log(this.data);
      }
    );
  }
  
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;
  }
  
  viewLeave(id: any) {
    console.log(id);
    localStorage.setItem('viewId', id);
    this.router.navigate(['view']);
  }

  ngOnInit(): void {
    this.getList();
  }


}
