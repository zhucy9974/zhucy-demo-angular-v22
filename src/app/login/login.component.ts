import {inject} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { forbiddenCharacterValidator } from 'src/app/shared/character.validator';
import { UserService } from "../demos/users/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from '../shared/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfigService } from '../app.config.service';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly sharedService = inject(SharedService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  propEmail: FormControl;
  propPass: FormControl;
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidCredentials = false;
  flagShowLogingRequisInfo = false;

  url = AppConfigService.settings?.apiUrl + 'auth/login';

  ngOnInit(): void {
    this.propEmail = new FormControl('', [
      Validators.required,
      Validators.email,
      forbiddenCharacterValidator('#'),
    ]);
    this.propPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.loginForm = this.formBuilder.group({
      email: this.propEmail,
      password: this.propPass,
    });
  }

  login() {
    this.submitted = true;

    this.invalidCredentials = true;
    //this.propPass.updateValueAndValidity();
    //this.propEmail.updateValueAndValidity();
    if (this.loginForm.valid) {
      const httpOption = {
        headers: new HttpHeaders({
          'content-type': 'application/json',
        }),
      };

      this.http
        .post(
          this.url,
          {
            email: this.propEmail.value,
            password: this.propPass.value,
          },
          httpOption,
        )
        .subscribe((res: any) => {
          if (res['status'] == 'KO') {
            if (res['errorMsg'] == '401' || res['errorMsg'] == '600') {
              this.propPass.setErrors({ error401: true });
              this.propEmail.setErrors({ error401: true });
            }
          } else {
            const token = res['token'];
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', res['username']);
            sessionStorage.setItem('firstName', res['firstName']);
            this.sharedService.sendFirstName(res['firstName']);
            const requestedUrl = this.route.snapshot.queryParamMap.get('returnUrl');
            const returnUrl = requestedUrl?.startsWith('/') && !requestedUrl.startsWith('//')
              ? requestedUrl
              : '/welcome';
            this.router.navigateByUrl(returnUrl);
          }
        });
    }
  }
}
