import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  templateUrl: 'signin.component.html'
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  @ViewChild('usernameInput')
  usernameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .authenticate(username, password)
      .subscribe(
        () => {
          this.router.navigate(['user', username]);
        },
        error => {
          console.log(error);

          this.loginForm.reset();

          if (this.platformDetectorService.isPlatformBrowser()) {
            this.usernameInput.nativeElement.focus();
          }
        });
  }
}
