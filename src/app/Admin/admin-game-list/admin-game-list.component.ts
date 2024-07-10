import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TrendingGamesComponent } from '../../trending-games/trending-games.component';
import { Subscription } from 'rxjs';
import { Games } from '../../models/games.model';
import { GameService } from '../../Services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-game-list',
  standalone: true,
  imports: [NgFor, NgIf, TrendingGamesComponent, AsyncPipe],
  templateUrl: './admin-game-list.component.html',
  styleUrl: './admin-game-list.component.scss',
})
export class AdminGameListComponent {
  private viewGamesSubscription?: Subscription;
  games?: Games[];
  error: any;

  constructor(
    private gameservice: GameService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  goToGameDetails(gameId: string): void {
    // Navigate to game details page using game ID
    this.router.navigate(['/admin/game/list/details', gameId]);
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.viewGamesSubscription = this.gameservice.getAllGames().subscribe({
      next: (response) => {
        this.games = response;
      },
    });
  }

  ngOnDestroy(): void {
    this.viewGamesSubscription?.unsubscribe();
  }
}
