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
    console.log(this.scores);
  }

  scores: any;
  winner: any;
  userId: any = null;
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    console.log(this.userId);
  }
}
