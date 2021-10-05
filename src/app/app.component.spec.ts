import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LeaveComponent } from './leave/leave.component';
import { SigninComponent } from './signin/signin.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        SigninComponent,
        LeaveComponent 
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
    const fixture = TestBed.createComponent(LeaveComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('leave');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('LeaveTracker app is running!');
  });
});
