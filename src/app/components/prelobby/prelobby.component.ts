import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-prelobby',
  templateUrl: './prelobby.component.html',
  styleUrls: ['./prelobby.component.scss'],
})
export class PrelobbyComponent {
  showModal: boolean = false;
  roomCode: string = 'XXX';
  hasStarted: boolean = false;
  apiUrl = 'http://localhost:3000/api/games/started/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private http: HttpClient
  ) {}
  async ngOnInit() {
    this.roomCode = this.route.snapshot.paramMap.get('id') || 'XXX';
    if (this.roomCode != 'XXX') {
      sessionStorage.setItem('roomId', this.roomCode);
      await this.http.get(this.apiUrl + this.roomCode).subscribe({
        next: (data: any) => {
          console.log(data);
          this.hasStarted = data.started;
        },
      });
    }
  }

  joinRoom() {
    sessionStorage.setItem('roomId', this.roomCode);
    this.http.get(this.apiUrl + this.roomCode).subscribe({
      next: (data: any) => {
        console.log(data);
        this.hasStarted = data.started;
        if (!this.hasStarted) {
          if (sessionStorage.getItem('token')) {
            this.router.navigate(['/lobby']);
          } else {
            this.showModal = true;
          }
        }
      },
    });
  }
  spectateGame() {
    if (this.roomCode != 'XXX') {
      this.socket.emitEvent('spectateRoom', { room: this.roomCode });
      sessionStorage.setItem('spectating', 'true');
      this.router.navigate(['/spectate']);
    }
  }

  async checkGameStatus() {}
}
