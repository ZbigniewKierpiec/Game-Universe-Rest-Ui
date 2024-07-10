import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameService } from '../Services/game.service';
import { Subscription } from 'rxjs';
import { Games } from '../models/games.model';

@Component({
  selector: 'app-trending-games',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trending-games.component.html',
  styleUrl: './trending-games.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrendingGamesComponent {
  private gamesSubscription?: Subscription;
  private viewGamesSubscription?: Subscription;
  games?: Games[];
constructor( private gameservice: GameService, private cdr: ChangeDetectorRef){};




ngOnInit(): void {
  this.cdr.detectChanges();
   this.viewGamesSubscription    =        this.gameservice.getAllGames()
  .subscribe({
    next: (response) => {
      this.games = response;

    },
  });
}



ngOnDestroy(): void {
this.viewGamesSubscription?.unsubscribe();
}




}
