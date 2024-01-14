import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent {
  games: any[] = [];
  selectedGame: any = null;
  userId: any = null;
  roomCode: any = null;
  isButtonDisabled: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const userToken = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('userId');
    const apiUrl = 'https://dartsmanager.agamador.com:3000/api/games/usergames';

    if (userToken) {
      this.http
        .get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        })
        .subscribe({
          next: (data: any) => {
            this.games = data.games;
            this.selectedGame = this.games[0];
            this.getGameScore(this.games[0].id);
          },
          error: (e) => {},
        });
    }
  }

  onInputChange() {
    this.isButtonDisabled = !/^[a-zA-Z]{5}$/.test(this.roomCode);
  }
  joinRoom() {
    sessionStorage.setItem('roomId', this.roomCode.toLowerCase());
    this.router.navigate(['/lobby']);
  }

  gameSelected(event: any) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.getGameScore(selectedId);
  }

  getGameScore(gameId: string) {
    const userToken = sessionStorage.getItem('token');
    const apiUrl = 'https://dartsmanager.agamador.com:3000/api/games/' + gameId;

    if (userToken) {
      this.http
        .get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
        })
        .subscribe({
          next: (data: any) => {
            data.gameData.scores = JSON.parse(data.gameData.scores);
            this.selectedGame = data.gameData;
          },
          error: (e) => {},
        });
    }
  }
}
