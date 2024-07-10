import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddGameComponent } from './add-game/add-game.component';
import { Component } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { UpdateComponentComponent } from './update-component/update-component.component';
import { ViewGamesComponent } from './view-games/view-games/view-games.component';
import { AdminGameListComponent } from './Admin/admin-game-list/admin-game-list.component';
import { AdminGameDetailsComponent } from './Admin/admin-game-details/admin-game-details.component';
import { AdminGameUpdateComponent } from './Admin/admin-game-update/admin-game-update.component';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'view/game', component: ViewGamesComponent },
  { path: 'game-details', component: GamesDetailComponent },
  { path: 'game-details/:id', component: GamesDetailComponent },
  // {path:'game-update/:id',component:UpdateComponentComponent},
  { path: 'admin/game/list', component: AdminGameListComponent },
  { path: 'admin/game/add', component: AddGameComponent },
  { path: 'admin/game/list/details', component: AdminGameDetailsComponent },
  { path: 'admin/game/list/details/:id', component: AdminGameDetailsComponent },
  { path: 'admin/game-update/:id', component: AdminGameUpdateComponent },
  { path: '**', redirectTo: 'home' }, // Wildcard route for a 404 page or redirect to home
];
