import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBedStatic, waitForAsync } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { appModuleDeclarations, appModuleImports, appModuleProviders } from '../app/app.module';
import { TestBedInitializer } from './test-bed-initializer';

describe('AppComponent', () => {
  let TestBed: TestBedStatic;
  let fixture: ComponentFixture<AppComponent>;
  let component : AppComponent;

  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: appModuleDeclarations,
      imports: appModuleImports,
      providers: appModuleProviders
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component  = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component ).toBeTruthy();
  });

  it('Botão de Login', () => {
    component.openLoginDialog = jest.fn()

    const loginButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login-button');
    loginButton.dispatchEvent(new Event('click'));

    expect((component.openLoginDialog as jest.Mock).mock.calls.length).toBe(1);
  });

  it('Botão de Logout', () => {
    component.logout = jest.fn()

    component.loggedIn$.next(true);
    fixture.detectChanges();

    const logoutButton: HTMLButtonElement = fixture.nativeElement.querySelector('.logout-button');
    logoutButton.dispatchEvent(new Event('click'));

    expect((component.logout as jest.Mock).mock.calls.length).toBe(1);
  });
});
