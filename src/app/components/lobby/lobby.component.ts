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
  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roomId = localStorage.getItem('roomId');

    if (!this.roomId) {
      this.roomId = this.generateId();
      localStorage.setItem('roomId', this.roomId);
    }

    this.shareUrl += this.roomId;

    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');

    console.log(this.userId, this.userName);

    //FIXME: Evitar repetir socket en la sala al unir jugadores
    this.socket.emitEvent('joinRoom', {
      room: this.roomId,
      user: this.userName,
      userId: this.userId,
    });
    //TODO: Si el nombre de usuario está presente, añadirlo a la tabla

    //TODO: Falta esto
    this.socket.onEvent('userJoined', (data: any) => {
      console.log(data);
      //add to table
    });

    this.socket.onEvent('gameStarted', (data: any) => {
      this.router.navigate(['/game'], { state: { data } });
    });
  }

  startGame() {
    this.socket.emitEvent('startGame', { room: this.roomId });
  }

  //TODO: revisa esto
  addPlayer() {
    this.userName = 'Luiti2';
    this.socket.emitEvent('addUserToLobby', {
      room: this.roomId,
      user: this.userName,
      userId: this.userId,
    });
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
