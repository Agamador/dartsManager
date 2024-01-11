import { Component, EventEmitter, Input, Output } from '@angular/core';

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
            (click)="deletePlayer(player)"
          />
        </td>
      </tr>
      <td class="num-col"></td>
      <td>
        <img
          (click)="emitShowModalEvent()"
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
  @Output() openEvent = new EventEmitter<boolean>();
  @Output() removePlayer = new EventEmitter<string>();

  ngOnChanges() {
    while (this.players.length < 8) {
      this.players.push('');
    }
  }

  emitShowModalEvent() {
    this.openEvent.emit(true);
  }
  deletePlayer(player: string | undefined) {
    //this.players = this.players.filter((p) => p !== player);
    this.removePlayer.emit(player);
  }
}
