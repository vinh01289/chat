import { Component, OnInit } from '@angular/core';
import { ErrorLogin } from 'src/app/model/error'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login_Template/vendor/bootstrap/css/bootstrap.min.css',
    './login_Template/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    './login_Template/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    './login_Template/vendor/animate/animate.css',
    './login_Template/vendor/css-hamburgers/hamburgers.min.css',
    './login_Template/vendor/animsition/css/animsition.min.css',
    './login_Template/vendor/select2/select2.min.css',
    './login_Template/vendor/daterangepicker/daterangepicker.css',
    './login_Template/css/util.css',
    './login_Template/css/main.css'
  ]
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  listErrorLogin: ErrorLogin [] = [];
  phoneNumber!: string;
  constructor(private fb: FormBuilder, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.loginIn()){
      this.router.navigate(['customer']);
    }
    this.validateForm = this.fb.group({
      phoneNumber: [null, [Validators.required]], 
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(form: any): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const phonenumber = form.value.phoneNumber;
    const password = form.value.password;

    this.auth.login(phonenumber, password)
    .subscribe(res => {
      this.router.navigate(['customer']);
    },
    error => {
      console.log('Lỗi đăng nhập', error);

      this.listErrorLogin = Object.values(error.error);
      // this.notification.create(
      //   'error',
      //   'Thất bại',
      //   'Xin vui lòng kiểm tra lại thông tin tài khoản');
    }
    );
  }

}
