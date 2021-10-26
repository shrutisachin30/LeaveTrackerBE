import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient,HttpClientModule } from '@angular/common/http';

//import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ToastrModule } from 'ngx-toastr';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { ListComponent } from './list/list.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SignupComponent } from './signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ViewComponent } from './view/view.component';
import { DialogComponent } from './dialog/dialog.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { DemoMaterialModule } from './material-module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ExportComponent } from './export/export.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DeactivateComponent } from './deactivate/deactivate.component';
import {Ng2TelInputModule} from 'ng2-tel-input';

  
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ListComponent,
    ApplyleaveComponent,
    ViewComponent,
    DialogComponent,
    ForgotpasswordComponent,
    ChangePasswordComponent,
    EditprofileComponent,
    ExportComponent,
    DeactivateComponent
   
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableExporterModule,
    DemoMaterialModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    Ng2TelInputModule,
    MatDividerModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
progressBar: true
    }),
   
  ],
  exports: [
    CommonModule,
     MatToolbarModule, 
     MatButtonModule, 
     MatCardModule, 
     MatInputModule, 
     MatDialogModule, 
     MatTableModule, 
     MatMenuModule,
     MatIconModule,
     Ng2TelInputModule,
     MatProgressSpinnerModule
     ],

  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
