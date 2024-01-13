import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @ViewChild(NgSelectComponent) ngSelectComponent:
    | NgSelectComponent
    | undefined;
  copied: boolean = false;
  shareUrl: string = 'http://localhost:4200/lobby/';
  initialData: any = {};
  roomId: string = '';
  roomStatus: any = null;
  actualScore: Array<string> = [];
  actualPlayer: string = '';
  turn: number = 1;
  numberOfPlayers: number = 0;
  plays = [
    'X',
    'B',
    'DB',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '18',
    '19',
    '20',
    'D1',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'D10',
    'D11',
    'D12',
    'D13',
    'D14',
    'D15',
    'D16',
    'D18',
    'D19',
    'D20',
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
    'T13',
    'T14',
    'T15',
    'T16',
    'T18',
    'T19',
    'T20',
  ];
  selectedPlay: string | null = null;

  userId: string | null = null;
  userName: string | null = null;

  constructor(private router: Router, private socket: SocketService) {
    const navigation = this.router.getCurrentNavigation();
    this.initialData = navigation?.extras.state!['data'];
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    this.roomId = this.initialData.roomId;
    this.shareUrl += this.roomId;
    this.roomStatus = this.initialData.room.scores;
    this.actualPlayer = this.getPlayer(this.turn);
    this.numberOfPlayers = Object.keys(this.roomStatus).length;

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

  addScore(score: string) {
    if (score != null) {
      this.actualScore.push(score);
      this.ngSelectComponent?.handleClearClick();
    }
  }

  removeScore() {
    this.actualScore.pop();
  }

  submitScore() {
    this.socket.emitEvent('submitScore', {
      room: this.roomId,
      player: this.actualPlayer,
      newScore: this.actualScore,
    });
    this.actualScore = [];
  }

  getPlayer(n: number) {
    for (let player of Object.keys(this.roomStatus)) {
      if (this.roomStatus[player].position == n) {
        return player;
      }
    }
    return '';
  }

  getOut() {
    let uid = sessionStorage.getItem('userId');
    sessionStorage.removeItem('roomId');
    uid ? this.router.navigate(['/history']) : this.router.navigate(['/home']);
  }

  copiedTimer() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
}
