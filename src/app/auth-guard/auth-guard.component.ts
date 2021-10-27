import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})

export class AuthGuardComponent implements CanActivate {
  //canActive function is used to checked whether user is logged in or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const len = localStorage.length
    if (len > 0) {
      return true;
    }
    else {
      alert("Please login to use this Application!!!");
      this.router.navigate(['/signin'])
      return false;
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
