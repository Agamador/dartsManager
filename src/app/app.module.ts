import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PrelobbyComponent } from './components/prelobby/prelobby.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameComponent } from './components/game/game.component';
import { PostgameComponent } from './components/postgame/postgame.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, RegisterComponent, ProfileComponent, PrelobbyComponent, HistoricalComponent, ScoreboardComponent, StatsComponent, LobbyComponent, GameComponent, PostgameComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
