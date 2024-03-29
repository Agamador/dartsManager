import { PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { HistoricalComponent } from './components/historical/historical.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { PostgameComponent } from './components/postgame/postgame.component';
import { PrelobbyComponent } from './components/prelobby/prelobby.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SpectateComponent } from './components/spectate/spectate.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'prelobby', component: PrelobbyComponent },
  { path: 'history', component: HistoricalComponent },
  { path: 'lobby/:id', component: PrelobbyComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game', component: GameComponent },
  { path: 'spectate', component: SpectateComponent },
  { path: 'postgame', component: PostgameComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [Location, { provide: Location, useClass: PathLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
