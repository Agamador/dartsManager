import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() closeEvent = new EventEmitter<void>();
  @Input() guestMode = false;
  @Input() useMail = true;
  close() {
    this.closeEvent.emit();
  }
}
