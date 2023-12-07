import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showModal: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/history']);
    }
  }
}
