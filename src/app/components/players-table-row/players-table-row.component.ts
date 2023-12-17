import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-players-table-row',
  template: ` <table>
    <tbody>
      <tr *ngFor="let player of players; let i = index">
        <td class="num-col">{{ i + 1 }}</td>
        <td class="name-col">
          {{ player }}
          <img
            *ngIf="player"
            src="/assets/svg/delete.svg"
            alt="Eliminar jugador"
          />
        </td>
      </tr>
      <td class="num-col"></td>
      <td>
        <img
          (click)="showModal = true"
          src="/assets/svg/person_add.svg"
          alt="Añadir jugador"
        />
      </td>
    </tbody>
  </table>`,
  styleUrls: ['./players-table-row.component.scss'],
})
export class PlayersTableRowComponent {
  @Input() players!: any[];
  @Input() i!: number;
  @Output() showModal!: boolean;

  ngOnChanges() {
    while (this.players.length < 8) {
      this.players.push('');
    }
  }
}
