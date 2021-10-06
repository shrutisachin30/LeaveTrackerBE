import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { SigninComponent } from './signin/signin.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ViewComponent } from './view/view.component';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        SigninComponent,
        ListComponent,
        ApplyleaveComponent, 
        ChangePasswordComponent,
        ForgotpasswordComponent,
        ViewComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(SigninComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('signin');
  });

  it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(ListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('list');
  });

  it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(ApplyleaveComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('apply');
  });

it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(ChangePasswordComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('changepassword');
  });

  it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(ForgotpasswordComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('forgotpassword');
  });
  it(`should have as title 'LeaveTracker'`, () => {
    const fixture = TestBed.createComponent(ViewComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('view');
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('LeaveTracker app is running!');
  });
});
