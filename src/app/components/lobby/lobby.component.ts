import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  showModal: boolean = false;
  roomId: string | null = null;
  shareUrl: string = 'http://localhost:4200/lobby/';
  copied: boolean = false;
  userId: string | null = null;
  userName: string | null = null;
  guestMode: boolean = false;
  backRoute: string = this.guestMode ? '/history' : '/home';
  players: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roomId = sessionStorage.getItem('roomId');

    if (!this.roomId) {
      this.roomId = this.generateId();
      sessionStorage.setItem('roomId', this.roomId);
    }

    this.shareUrl += this.roomId;

    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    if (!this.userId) {
      this.guestMode = true;
    }
    if (this.userName) {
      this.addPlayer({ userName: this.userName, userId: this.userId });
    }

    this.socket.onEvent('userJoined', (data: any) => {
      if (data.scores) this.players = Object.keys(data.scores);
    });

    this.socket.onEvent('gameStarted', (data: any) => {
      this.router.navigate(['/game'], { state: { data } });
    });
  }

  startGame() {
    this.socket.emitEvent('startGame', { room: this.roomId });
  }

  addPlayer(player: any) {
    this.socket.emitEvent('joinRoom', {
      room: this.roomId,
      user: player.userName,
      userId: player.userId,
    });
    this.players.push(player.userName);
  }

  getOut() {
    this.removePlayer(this.userName!);
    sessionStorage.removeItem('roomId');
    this.router.navigate([this.backRoute]);
  }

  removePlayer(playerName: string) {
    this.socket.emitEvent('leaveRoom', {
      room: this.roomId,
      userName: playerName,
    });
    this.players = this.players.filter((player) => player !== playerName);
  }

  generateId() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';

    for (let i = 0; i < 5; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }

    return id;
  }
  copiedTimer() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
  }
}
