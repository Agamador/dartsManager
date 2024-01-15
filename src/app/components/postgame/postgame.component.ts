import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postgame',
  templateUrl: './postgame.component.html',
  styleUrls: ['./postgame.component.scss'],
})
export class PostgameComponent {
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.scores = navigation?.extras.state!['data'].scores;
    this.winner = navigation?.extras.state!['data'].winner;
    this.userId = sessionStorage.getItem('userId');
  }

  scores: any;
  winner: any;
  userId: any = null;
}
