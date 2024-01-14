import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileForm: FormGroup;
  showError = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    const userToken = sessionStorage.getItem('token');
    const apiUrl = 'https://dartsmanager.agamador.com:3000/api/users/profile';

    if (userToken) {
      this.http
        .get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        })
        .subscribe({
          next: (v: any) => {
            this.profileForm.setValue({
              name: v.user.name,
              surname: v.user.surname,
              email: v.user.email,
            });
          },
          error: (e) => {
            console.log('This should not happen', e);
          },
        });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

  onSubmit() {
    const userToken = sessionStorage.getItem('token');

    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      const apiUrl = 'https://dartsmanager.agamador.com:3000/api/users/edit';
      const body = JSON.stringify({ newData: formData });
      this.http
        .post(apiUrl, body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        })
        .subscribe({
          next: (v: any) => {
            sessionStorage.setItem('token', v.token);
            sessionStorage.setItem('userId', v.user.id);
            sessionStorage.setItem('userName', v.user.name);
            this.router.navigate(['/history']);
          },
          error: (e) => {
            if (e.error.message === 'Error updating user') {
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
