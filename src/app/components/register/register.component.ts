import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registroForm: FormGroup = new FormGroup({});
  showError = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+/)]],
      surname: ['', [Validators.required, Validators.pattern(/[a-zA-Z]+/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      const apiUrl = 'http://localhost:3000/api/users/register';
      const body = JSON.stringify({ user: formData });
      this.http
        .post(apiUrl, body, {
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
            if (e.error.message === 'User already exists') {
              this.showError = true;
              setTimeout(() => {
                this.showError = false;
              }, 5000);
            }
          },
        });
    }
  }
}
