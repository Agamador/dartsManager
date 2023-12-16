import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  initialData: any = {};
  roomId: string = '';
  actualScore: Array<string> = [];
  actualPlayer: string = '';
  tableData: any = null;
  userId: string | null = null;
  userName: string | null = null;
  constructor(private router: Router, private socket: SocketService) {
    const navigation = this.router.getCurrentNavigation();
    this.initialData = navigation?.extras.state!['data'];
    console.log(
      '🚀 ~ file: game.component.ts:21 ~ GameComponent ~ constructor ~ initialData:',
      this.initialData
    );
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    this.roomId = this.initialData.roomId;
    console.log(this.roomId);
    this.socket.onEvent('scoreSubmitted', (data: any) => {
      //TODO:
      //actualizar tabla y actual player, si el player es el actual, permitir sumar puntos, si no no, tienes el ID para eso
      //crea un array, que tienes que pasar en el state, con los id's de los jugadores de este socket
      this.tableData = data.scores;
      console.log(this.tableData);
    });

    this.socket.onEvent('gameFinished', (data: any) => {
      console.log(data);
      this.router.navigate(['/postgame'], { state: { data } });
    });
  }

  addScore(score: string) {
    console.log(score);
    this.actualScore.push(score);
    if (this.actualScore.length == 3) {
      //prompt user if punctuation is ok, then submit and clean
      this.submitScore();
      console.log('submit score');
      //next player
    }
  }

  removeScore() {
    this.actualScore.pop();
  }

  submitScore() {
    this.socket.emitEvent('submitScore', {
      room: this.roomId,
      user: this.userName,
      newScore: this.actualScore,
    });
    this.actualScore = [];
  }
}
