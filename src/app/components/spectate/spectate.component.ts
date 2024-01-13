import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-spectate',
  templateUrl: './spectate.component.html',
  styleUrls: ['./spectate.component.scss'],
})
export class SpectateComponent {
  constructor(private router: Router, private socket: SocketService) {}

  actualPlayer: string = '';
  turn: number = 1;
  numberOfPlayers: number = 0;
  roomId: string = sessionStorage.getItem('roomId') || '';
  roomStatus: any = null;

  ngOnInit() {
    if (!sessionStorage.getItem('spectating')) {
      this.router.navigate(['/']);
    }

    this.socket.onEvent('scoreSubmitted', (data: any) => {
      this.turn = data.turn;
      this.roomStatus = data.scores;
      this.actualPlayer = this.getPlayer(this.turn);
    });

    this.socket.onEvent('gameFinished', (data: any) => {
      sessionStorage.removeItem('roomId');
      this.router.navigate(['/postgame'], { state: { data } });
    });
  }

  leave() {
    sessionStorage.removeItem('spectating');
    this.router.navigate(['/']);
  }

  getPlayer(n: number) {
    for (let player of Object.keys(this.roomStatus)) {
      if (this.roomStatus[player].position == n) {
        return player;
      }
    }
    return '';
  }
}
