import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { AuthGuardComponent } from './auth-guard/auth-guard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeactivateComponent } from './deactivate/deactivate.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ExportComponent } from './export/export.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ListComponent } from './list/list.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  
  {path:'', component: SigninComponent},
  //{path:'**', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'changePassword', component: ChangePasswordComponent, canActivate:[AuthGuardComponent]},
  {path:'signin', component: SigninComponent},
  {path:'list', component: ListComponent, canActivate:[AuthGuardComponent] },
  {path:'applyleave', component: ApplyleaveComponent,canActivate:[AuthGuardComponent]},
  {path:'view', component: ViewComponent,canActivate:[AuthGuardComponent]},
  {path:'forgotpassword', component: ForgotpasswordComponent},
  {path:'editprofile', component: EditprofileComponent,canActivate:[AuthGuardComponent]},
  {path:'export', component: ExportComponent,canActivate:[AuthGuardComponent]},
  {path:'deactivate', component: DeactivateComponent,canActivate:[AuthGuardComponent]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
