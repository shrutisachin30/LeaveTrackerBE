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
  url = "http://localhost:8080/psa/";
  viewDasId: any = localStorage.getItem('viewId');
isCancel:any = true;
empid = localStorage.getItem('dasId');

  displayedColumns: string[] = ['id', 'startdate', 'enddate','typeOfLeave', 'status', 'updatedBy','updatedOn','view'];
  canceldata = {
    startdate: "",
    enddate: "",
    dasid: "",
    updatedBy : "",
    updatedOn : "",
  }
  date = new Date();
  length = 0;

  dataSource = [{
    id: 0,
    startDate: "",
    endDate: "",
    status: "",
    // count:"",
    updatedBy : "",
    updatedOn : "",
    disable: false,
  }];
  dasid: any = localStorage.getItem('viewId');

  @ViewChild(MatPaginator)
paginator: MatPaginator;
data: MatTableDataSource<any>;

  constructor(private dialogservice: DialogService, private http: HttpClient, private router: Router) {
    this.id = 1;
    this.viewDasId = localStorage.getItem('viewId');
    this.getLeaves(this.viewDasId).subscribe((res: any) => {
      this.dataSource = res;
      this.fun();
      //this.count();
      this.length = this.dataSource.length;
      this.data.paginator = this.paginator;
    });

  }

  id: any;


  ngOnInit(): void {
    console.log(this.viewDasId,this.empid)
    if(this.viewDasId != this.empid){
      this.isCancel =true;
      
    }
    else{
      console.log(this.viewDasId,this.empid)
      this.isCancel = false;
    }
  }

  getLeaves(id: String): any {
    let Id = localStorage.getItem('viewId');

    return this.http.get(this.url + "retrieveLeaveData/" + Id);
  }
  pad2(n:any) {
    return (n < 10 ? '0' : '') + n;
  }
  cancelLeave(id: any, startdate: any, enddate: any, updatedBy:any, updatedOn:any) {
    /*  this.leavedata.startdate=startdate;
     this.leavedata.enddate=enddate; */
     var uOn = new Date();
     var month = this.pad2(uOn.getMonth() + 1);//months (0-11)
     var day = this.pad2(uOn.getDate());//day (1-31)
     var year = uOn.getFullYear();
 
     var uOnFormattedDate:any = day + "-" + month + "-" + year;
     console.log(uOnFormattedDate);
    this.dialogservice.openConfirmDialog('Are you sure you want to Cancel?').afterClosed().subscribe(res => {
      console.log('id :- ' + res)
      if (res) {
        console.log('id :- ' + id)
        this.canceldata.dasid = (this.dasid);
        this.canceldata.startdate = startdate;
        this.canceldata.enddate = enddate;
        this.canceldata.updatedBy = updatedBy;
        this.canceldata.updatedOn = updatedOn;
        console.log(this.canceldata)
        this.http.post(this.url + "cancelLeave", this.canceldata).subscribe();
        window.location.reload();
        //this.router.navigate(['view']);
      }
    })
    console.log(startdate)


    //window.location.reload();
  }


  fun() {
    console.log('fun');
    for (let l of this.dataSource) {
      var status = l.status.toString();
      console.log('id:', l.id);
      console.log('status:', status);
      console.log('leave start date:', new Date(l.startDate));
      console.log('leave end date:', new Date(l.endDate));
      console.log('current date:', new Date());
      //console.log('count:',this.count());
      l.id = this.id++;
      if (status.includes('cancelled') || new Date(l.startDate) < new Date()) {
        l.disable = true;
        console.log('disable:', l.disable);
      }
      if(this.viewDasId != this.empid){
        l.disable = true;
      }
    }
    this.data = new MatTableDataSource<any>(this.dataSource);
  }
  // count():any{
  //   //console.log('count');
  //   for (let c of this.dataSource) { 
  //   var date1 = new Date(c.startDate); 
  //   var date2 = new Date(c.endDate); 
    
  //     var Time = date2.getTime() - date1.getTime(); 
  //     var Days = Time / (1000 * 3600 * 24); 
  //    return Days;
  // }
//}
}




