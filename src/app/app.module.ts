import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { PlayersTableRowComponent } from './components/players-table-row/players-table-row.component';
import { PostgameComponent } from './components/postgame/postgame.component';
import { PrelobbyComponent } from './components/prelobby/prelobby.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { StatsComponent } from './components/stats/stats.component';
import { SocketService } from './services/socket.service';
import { SpectateComponent } from './components/spectate/spectate.component';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PrelobbyComponent,
    HistoricalComponent,
    ScoreboardComponent,
    StatsComponent,
    LobbyComponent,
    GameComponent,
    PostgameComponent,
    PlayersTableRowComponent,
    SpectateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [SocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
