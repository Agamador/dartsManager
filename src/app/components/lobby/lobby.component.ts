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
  constructor(
    private route: ActivatedRoute,
    private socket: SocketService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roomId =
      this.route.snapshot.paramMap.get('id') || localStorage.getItem('roomId');
    if (!this.roomId) {
      this.roomId = this.generateId();
      localStorage.setItem('roomId', this.roomId);
    }
    this.socket.emitEvent('joinRoom', { room: this.roomId });
  }

  newLobby() {}

  generateId() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz';
    let id = '';

    for (let i = 0; i < 5; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }

    return id;
  }
}
