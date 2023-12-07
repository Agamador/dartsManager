import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Input() guestMode = false;
  @Input() useMail = true;
  loginForm: FormGroup = new FormGroup({});
  showError = false;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      inputField: ['', Validators.required], // Nombre o Email
      password: ['', Validators.required],
    });
  }

  toggleUseMail() {
    this.useMail = !this.useMail;
    const inputField = this.loginForm.get('inputField');
    if (this.useMail) {
      inputField?.setValidators([Validators.required, Validators.email]);
    } else {
      inputField?.setValidators([Validators.required]);
    }
    inputField?.updateValueAndValidity();
  }
  onSubmit() {
    if (this.useMail) this.mailLogin();
    else {
      localStorage.setItem('userName', this.loginForm.get('inputField')?.value);
      localStorage.setItem('userId', 'guest');
    }
  }
  close() {
    this.closeEvent.emit();
  }

  mailLogin() {
    const body = JSON.stringify({
      user: {
        email: this.loginForm.get('inputField')?.value,
        password: this.loginForm.get('password')?.value,
      },
    });
    this.http
      .post('http://localhost:3000/api/users/login', body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (v: any) => {
          localStorage.setItem('token', v.token);
          localStorage.setItem('userId', v.user.id);
          localStorage.setItem('userName', v.user.name);
          this.router.navigate(['/history']);
        },
        error: (e) => {
          if (e.error.message == 'Invalid credentials') {
            this.showError = true;
            setTimeout(() => {
              this.showError = false;
            }, 5000);
          }
        },
      });
  }
}
