import { Component } from '@angular/core';

@Component({
  selector: 'app-postgame',
  templateUrl: './postgame.component.html',
  styleUrls: ['./postgame.component.scss'],
})
export class PostgameComponent {
  tableData = {
    gamemode: undefined,
    scores: {
      Alejandro: {
        id: '3',
        score: [
          ['T1', 'T4', '5'],
          ['2', '21', '1'],
          ['2', '4', '14'],
        ],
        position: 1,
      },
      aaa: {
        id: null,
        score: [
          ['T1', 'T4', '5'],
          ['3', '7', '18'],
          ['3', '5', '19'],
        ],
        position: 2,
      },
    },
  };
}
