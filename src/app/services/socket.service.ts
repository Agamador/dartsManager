import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // Método para emitir un evento al servidor
  emitEvent(eventName: string, data?: any) {
    this.socket.emit(eventName, data);
  }

  // Método para escuchar eventos del servidor
  onEvent(eventName: string, callback: (data: any) => void) {
    this.socket.on(eventName, callback);
  }
}
