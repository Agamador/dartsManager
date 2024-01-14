import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() gameData: any[] = [];
  @Input() userId: any = null;
  playerName: any = null;
  scores: any[] = [];
  bestPlay: any = null;
  repeatedPlay: any = null;
  repeatedSection: any = null;
  worstPlay: any = null;
  worstStreak: any = null;
  numberOfMisses: any = null;
  bestPlayIndex: any = null;
  repeatedPlayIndex: any = null;
  worstPlayIndex: any = null;

  ngOnInit() {
    if (this.gameData) this.updateStats();
  }
  ngOnChanges() {
    if (this.gameData) this.updateStats();
  }

  updateStats() {
    Object.keys(this.gameData).forEach((key: any) => {
      if (this.gameData[key]?.id === this.userId) {
        this.scores = this.gameData[key].score;
        this.playerName = key;
      }
    });

    this.updateBestWorstPlay();
    this.updateRepeatedPlay();
    this.updateRepeatedSection();
    this.updateWorstStreak();
    this.updateNumberOfMisses();
  }

  updateBestWorstPlay() {
    let bestScore = -1;
    let bestScoreIndex = -1;
    let worstScore = 1000;
    let worstScoreIndex = -1;
    for (let i = 0; i < this.scores.length; i++) {
      const currentScore = this.parseScore(this.scores[i]);
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestScoreIndex = i;
      }
      if (currentScore < worstScore) {
        worstScore = currentScore;
        worstScoreIndex = i;
      }
    }

    this.bestPlay = bestScore;
    this.bestPlayIndex = bestScoreIndex;
    this.worstPlay = worstScore;
    this.worstPlayIndex = worstScoreIndex;
  }

  updateRepeatedPlay() {
    const counts: any = {};
    for (let i = 0; i < this.scores.length; i++) {
      const scoreString = this.scores[i].join('');
      counts[scoreString] = { value: (counts[scoreString] || 0) + 1, index: i };
    }
    let maxCount = 0;
    for (let key in counts) {
      if (counts[key].value >= maxCount) {
        maxCount = counts[key].value;
        this.repeatedPlay = this.scores[counts[key].index];
        this.repeatedPlayIndex = counts[key].index;
      }
    }
  }

  updateRepeatedSection() {
    const counts: any = {};
    for (let score of this.scores) {
      for (let section of score) {
        counts[section] = (counts[section] || 0) + 1;
      }
    }
    let maxCount = 0;
    for (let key in counts) {
      if (counts[key] >= maxCount) {
        maxCount = counts[key];
        this.repeatedSection = key;
      }
    }
  }
  updateWorstStreak() {
    let currentStreakStart = 0;
    let currentStreakEnd = 0;
    let longestStreakStart = 0;
    let longestStreakEnd = 0;
    let isDecreasing = false;
    let maxDecreasingStreak = 0;

    for (let i = 1; i < this.scores.length; i++) {
      const prevScore = this.parseScore(this.scores[i - 1]);
      const currentScore = this.parseScore(this.scores[i]);

      if (currentScore < prevScore) {
        if (!isDecreasing) {
          currentStreakStart = i - 1;
          isDecreasing = true;
        }
        currentStreakEnd = i;
      } else {
        if (isDecreasing) {
          isDecreasing = false;
          const currentStreakLength = currentStreakEnd - currentStreakStart + 1;
          if (currentStreakLength > maxDecreasingStreak) {
            maxDecreasingStreak = currentStreakLength;
            longestStreakStart = currentStreakStart;
            longestStreakEnd = currentStreakEnd;
          }
        }
      }
    }

    if (isDecreasing) {
      const currentStreakLength = currentStreakEnd - currentStreakStart + 1;
      if (currentStreakLength > maxDecreasingStreak) {
        maxDecreasingStreak = currentStreakLength;
        longestStreakStart = currentStreakStart;
        longestStreakEnd = currentStreakEnd;
      }
    }
    this.worstStreak = {};
    this.worstStreak.start = longestStreakStart;
    this.worstStreak.end = longestStreakEnd;
  }

  updateNumberOfMisses() {
    this.numberOfMisses = 0;

    for (let i = 0; i < this.scores.length; i++) {
      for (const score of this.scores[i]) {
        if (score === 'X') {
          this.numberOfMisses++;
        }
      }
    }
  }
  parseScore(score: any[]) {
    let total = 0;
    let multiplier = 1;

    for (let i = 0; i < score.length; i++) {
      const current = score[i];
      if (current[0] === 'T') {
        const value = parseInt(current.slice(1));
        if (!isNaN(value)) {
          total += value * 3;
        }
      } else if (current[0] === 'D') {
        if (current.slice(1) == 'B') total += 50;
        else {
          const value = parseInt(current.slice(1));
          if (!isNaN(value)) {
            total += value * 2;
          }
        }
      } else if (current === 'B') {
        total += 25 * multiplier;
        multiplier = 1;
      } else if (current === 'X') {
        total += 0;
        multiplier = 1;
      } else {
        const value = parseInt(current);
        if (!isNaN(value)) {
          total += value * multiplier;
        }
      }
    }
    return total;
  }
}
