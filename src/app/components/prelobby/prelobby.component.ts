import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prelobby',
  templateUrl: './prelobby.component.html',
  styleUrls: ['./prelobby.component.scss'],
})
export class PrelobbyComponent {
  showModal: boolean = false;
  roomCode: string = 'XXX';
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.roomCode = this.route.snapshot.paramMap.get('id') || 'XXX';
    sessionStorage.setItem('roomId', this.roomCode);
  }

  joinRoom() {
    if (sessionStorage.getItem('token')) {
      console.log('joining room');
      this.router.navigate(['/lobby']);
    } else {
      this.showModal = true;
    }
  }
}
