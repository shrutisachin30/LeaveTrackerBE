import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ListComponent } from './list/list.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  
  {path:'', component: SigninComponent},
  //{path:'**', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'signin', component: SigninComponent},
  {path:'list', component: ListComponent},
  {path:'applyleave', component: ApplyleaveComponent},
  {path:'view', component: ViewComponent},
  {path:'forgotpassword', component: ForgotpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
