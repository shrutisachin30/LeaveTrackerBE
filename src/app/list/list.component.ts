import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//List Class is created in which all variables are declared in constructor
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
    public domain: string
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
  //Column's are displayed in the way mentioned in displayedColumns: string[], in web browser on web page
  displayedColumns: string[] = ['dasId', 'name', 'gcmLevel', 'mobile', 'emailId', 'reportingManager', 'domain', 'projectName', 'jobRole', 'isActive', 'view'];
  dataSource = this.list;
  clickedRows = new Set<List>();
  //@ViewChild decorator to access template reference variable inside the component.
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  data: MatTableDataSource<any>;

  //@ViewChild decorator to access template reference variable inside the component.
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _http: HttpClient, private router: Router, private toastr: ToastrService) {
    this.user = {
      dasid: ''
    }
    this.emp = {};
    //Getting DasId from Local Storage
    this.emp.empid = localStorage.getItem('dasId');
    //Getting Admin status from Local Storage
    this.isAdmin = localStorage.getItem('Admin');
    this.name = localStorage.getItem('name');
  }

  //onLogout() function is to remove each and every item from Local storage and to redirect to Sign In Page
  onLogout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
 }

  //getList() function is used to get the List of Employee's into the table
  getList() {
    //Http get call for communicating with Backend services to get the list of Employee's from BackEnd
    this._http.get<any>('http://localhost:8080/psa/getEmployeeDetails').subscribe(
      response => {
        this.list = response;
        this.data = new MatTableDataSource<any>(this.list);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
        this.data.filterPredicate =
          (data: any, filter: string) => ((data.name.toLowerCase().indexOf(filter) != -1) || (data.dasId.toLowerCase().indexOf(filter) != -1));
      }
    );
  }

  //applyFilter() function is used to apply filter on Name and Das Id into the table
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;
  }

  //viewLeave function is used to save data of Das Id into Local Storage as well as to redirect to View Leaves Page
  viewLeave(id: any) {
    localStorage.setItem('viewId', id);
    this.router.navigate(['view']);
  }

  ngOnInit(): void {
    this.getList();
  }
}
