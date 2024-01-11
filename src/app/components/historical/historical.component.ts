import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent {
  games: any[] = [];
  selectedGame: any = null;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    const userToken = sessionStorage.getItem('token');
    const apiUrl = 'http://localhost:3000/api/games/usergames';

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

  gameSelected(event: any) {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.getGameScore(selectedId);
  }

  getGameScore(gameId: string) {
    const userToken = sessionStorage.getItem('token');
    const apiUrl = 'http://localhost:3000/api/games/' + gameId;

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
