import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showModal: boolean = false;
  guestMode: boolean = false;
  useMail: boolean = true;
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/history']);
    }
  }
}
