import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() isTall = false;
  @Input() tableData: any = null;
  @Input() updateEvent: any = null;
  @Input() inGame: boolean = false;
  @Input() winner: string = '';
  nScores: number = 0;
  players: string[] = [];

  ngOnInit() {
    this.updateTable();
  }
  updateTable() {
    this.nScores = Math.max(
      ...Object.keys(this.tableData).map((playerName: any) => {
        return this.tableData[playerName].score.length;
      })
    );
    this.players = Object.keys(this.tableData);
  }
  ngOnChanges() {
    this.updateTable();
  }
}
