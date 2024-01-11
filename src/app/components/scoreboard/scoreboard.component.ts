import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() isTall = false;
  @Input() tableData: any = null;

  nScores: number = 0;
  players: string[] = [];
  ngOnInit() {
    this.nScores = Math.max(
      ...Object.keys(this.tableData).map((playerName: any) => {
        console.log(playerName);
        return this.tableData[playerName].score.length;
      })
    );
    this.players = Object.keys(this.tableData);
  }
}
