import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Output() addPlayerEvent = new EventEmitter<any>();
  @Input() guestMode = false;
  @Input() useMail = true;
  @Input() phase = '';

  loginForm: FormGroup = new FormGroup({});
  showError = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      inputField: ['', [Validators.required, Validators.email]], // Nombre o Email
      password: ['', Validators.required],
    });

    if (!this.guestMode && !this.useMail) {
      const inputField = this.loginForm.get('inputField');
      const passwordField = this.loginForm.get('password');
      inputField?.setValidators([Validators.required, Validators.minLength(3)]);
      passwordField?.setValidators([]);

      inputField?.updateValueAndValidity();
      passwordField?.updateValueAndValidity();
    }
  }

  toggleUseMail() {
    this.useMail = !this.useMail;
    const inputField = this.loginForm.get('inputField');
    const passwordField = this.loginForm.get('password');
    if (this.useMail) {
      inputField?.setValidators([Validators.required, Validators.email]);
      passwordField?.setValidators([Validators.required]);
    } else {
      inputField?.setValidators([Validators.required, Validators.minLength(3)]);
      passwordField?.setValidators([]);
    }
    inputField?.updateValueAndValidity();
    passwordField?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.phase == 'lobby') this.lobbySubmit();
    else this.homeSubmit();
  }
  async homeSubmit() {
    if (this.useMail) {
      const data = await this.mailLogin();
      if (!data.error) {
        sessionStorage.setItem('userId', data.user.id!);
        sessionStorage.setItem('userName', data.user.name);
        sessionStorage.setItem('token', data.token!);
        this.router.navigate([this.phase == 'home' ? '/history' : '/lobby']);
      }
    } else {
      sessionStorage.setItem(
        'userName',
        this.loginForm.get('inputField')?.value
      );
      this.router.navigate(['/lobby']);
    }
  }

  async lobbySubmit() {
    let player = { user: '', userId: null };
    if (this.useMail) {
      const data = await this.mailLogin();
      if (!data.error) {
        player.user = data.user.name;
        player.userId = data.user.id;
      }
    } else {
      player.user = this.loginForm.get('inputField')?.value;
    }
    this.addPlayerEvent.emit({
      userName: player.user,
      userId: player.userId,
    });
    this.close();
  }

  async prelobbySubmit() {
    if (this.useMail) {
      const data = await this.mailLogin();
      if (!data.error) {
        //add data to players table and send
        this.close();
      }
    } else {
      let playerName = this.loginForm.get('inputField')?.value;
      this.router.navigate(['/lobby', { playerName }]);
    }
  }
  async mailLogin() {
    const body = JSON.stringify({
      user: {
        email: this.loginForm.get('inputField')?.value,
        password: this.loginForm.get('password')?.value,
      },
    });
    let data: any = {};
    try {
      data = await firstValueFrom<any>(
        this.http.post('http://localhost:3000/api/users/login', body, {
          headers: { 'Content-Type': 'application/json' },
        })
      );
      console.log(data);
    } catch (e: any) {
      if (e.error.message == 'Invalid credentials') {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      }
      data.error = true;
    }
    return data;
  }

  close() {
    this.closeEvent.emit();
  }
}
