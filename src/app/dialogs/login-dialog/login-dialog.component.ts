import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthApiService } from '../../../app/core/api/auth-api.service';
import { UserService } from '../../../app/core/api/user.service';
import { AuthService } from '../../../app/core/security/auth.service';
import { User } from '../../../app/models/user.model';
import { CustomValidators } from '../../../app/utils/custom.validators';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  @ViewChild("matTabGroup", { static: false }) matTabGroup!: MatTabGroup;

  processing: boolean = false;

  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  loginObservable!: Observable< { access_token: string }>;

  signUpObservable!: Observable<User>;
  matchingPasswords: boolean = false;

  constructor(
    private authApiService: AuthApiService,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [CustomValidators.notBlank]],
      password: ['', [CustomValidators.notBlank]]
    });

    this.loginForm.valueChanges.subscribe((res: User) => {
      this.loginObservable = this.authApiService.login({
        username: res.username || '',
        password: res.password || ''
      });
    });

    this.signUpForm = this.fb.group({
      username: ['', [CustomValidators.notBlank]],
      password: ['', [CustomValidators.notBlank]],
      confirmPassword: ['', [CustomValidators.notBlank]]
    });

    this.signUpForm.valueChanges.subscribe((res: {username: string, password: string, confirmPassword: string}) => {
      this.matchingPasswords = res.password === res.confirmPassword;
      this.signUpObservable = this.userService.createUser({
        username: res.username || '',
        password: res.password || ''
      });
    });
  }

  loginRes(res: HttpErrorResponse | { access_token: string }): void {
    if (res instanceof HttpErrorResponse) {
      let message = '';
      switch (res.status) {
        case 401:
          message = 'Senha incorreta...';
          break;
        case 404:
          message = 'Usuário não encontrado...';
          break;
        default:
          message = 'Ocorreu um erro inesperado na operação.'
      }

      this.snackbar.open(message, 'OK', {
        horizontalPosition: 'center',
        duration: 4000
      });
      this.endProcessing();
    } else {
      this.authService.fetchUserInfo(this.loginForm.get('username')?.value || '', res.access_token);

      this.snackbar.open('Login efetuado com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000
      });

      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    }
  }

  signUpRes(res: HttpErrorResponse | { access_token: string }): void {
    if (res instanceof HttpErrorResponse) {
      this.userService.getUser(this.signUpForm.get('username')?.value || '').subscribe({
        next: _ => {

          this.snackbar.open('Já há um usuário com esse nome!', 'OK', {
            horizontalPosition: 'center',
            duration: 4000
          });
          this.signUpForm.reset();
          this.endProcessing();
        },
        error: _ => {
          this.snackbar.open('Ocorreu um erro inesperado na operação...', 'OK', {
            horizontalPosition: 'center',
            duration: 4000
          });
          this.endProcessing();
        }
      });
    } else {
      this.snackbar.open('Conta criada com sucesso!', 'OK', {
        horizontalPosition: 'center',
        duration: 4000
      });
      this.signUpForm.reset();
      this.matTabGroup.selectedIndex = 0;
      this.endProcessing();
    }
  }

  beginProcessing(): void {
    this.processing = true;
    this.dialogRef.disableClose = true;
    this.loginForm.disable();
    this.signUpForm.disable();
  }

  endProcessing(): void {
    this.processing = false;
    this.dialogRef.disableClose = false;
    this.loginForm.enable();
    this.signUpForm.enable();
  }
}
