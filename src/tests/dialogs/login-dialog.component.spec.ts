import 'zone.js';
import 'zone.js/testing';
import "@angular/compiler";
import { ComponentFixture, TestBedStatic } from '@angular/core/testing';
import { LoginDialogComponent } from '../../app/dialogs/login-dialog/login-dialog.component';
import { TestBedInitializer } from '../test-bed-initializer';
import { dialogsModuleImports, dialogsModuleDeclarations, dialogsModuleProviders } from '../../app/dialogs/dialogs.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('LoginDialogComponent', () => {
  let TestBed: TestBedStatic;
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  beforeAll(() => {
    TestBed = TestBedInitializer.getTestBed();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: dialogsModuleDeclarations,
      imports: dialogsModuleImports,
      providers: [
        ...dialogsModuleProviders,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },

      ]
    });
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Cria o componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Aba de Login', () => {
    it('Botão de login desabilitado com campos vazios', () => {
      const loginButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login-button button');

      expect(loginButton.disabled).toBeTruthy();
    });

    it('Botão de login habilitado com campos preenchidos', () => {
      component.loginForm.get('username')?.setValue('test');
      component.loginForm.get('password')?.setValue('test');

      fixture.detectChanges();

      const loginButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login-button button');

      expect(loginButton.disabled).toBeFalsy();
    });
  });


  describe('Aba de Criar Conta', () => {
    let signUpButton: HTMLButtonElement;

    beforeEach(() => {
      fixture.nativeElement.querySelectorAll('.mdc-tab')[1].click();
      fixture.detectChanges();
    });

    it('Botão de criar conta desabilitado com campos vazios', () => {
      fixture.whenStable().then(() => {
        signUpButton = fixture.nativeElement.querySelector('.sign-up-button button');
        expect(expect(signUpButton.disabled)).toBeTruthy();
      });
    });

    it('Botão de criar conta desabilitado com campos preenchidos e confirmação de senha inválida', () => {
      fixture.whenStable().then(() => {
        component.signUpForm.get('username')?.setValue('test');
        component.signUpForm.get('password')?.setValue('test');
        component.signUpForm.get('confirmPassword')?.setValue('test2');

        fixture.detectChanges();

        expect(signUpButton.disabled).toBeTruthy();
      });
    });

    it('Botão de criar conta habilitado com campos preenchidos e confirmação de senha válida', () => {
      fixture.whenStable().then(() => {
        component.signUpForm.get('username')?.setValue('test');
        component.signUpForm.get('password')?.setValue('test');
        component.signUpForm.get('confirmPassword')?.setValue('test');

        fixture.detectChanges();

        expect(signUpButton.disabled).toBeFalsy();
      });
    });
  });
});
