import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() isTall = false;
  @Input() tableData: any = null;

  ngOnInit() {
    console.log(this.tableData);
  }
}
