import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = JSON.stringify({ user: formData });
      this.http.post(apiUrl, body, { headers }).subscribe({
        next: (v: any) => {
          localStorage.setItem('token', v.token);
          localStorage.setItem('userId', v.user.id);
          localStorage.setItem('userName', v.user.name);
          this.router.navigate(['/history']);
        },
        error: (e) => {
          if (e.error.message === 'User already exists') {
            alert('El usuario ya existe, utilice otro email, o inicie sesión.');
          }
        },
      });
    }
  }
}
