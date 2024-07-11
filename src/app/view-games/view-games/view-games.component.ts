import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../Services/game.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TrendingGamesComponent } from '../../trending-games/trending-games.component';
import { Games } from '../../models/games.model';

@Component({
  selector: 'app-view-games',
  standalone: true,
  imports: [NgFor, NgIf, TrendingGamesComponent, AsyncPipe],
  templateUrl: './view-games.component.html',
  styleUrl: './view-games.component.scss',
})
export class ViewGamesComponent implements OnInit, OnDestroy {
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
    this.router.navigate(['/game-details', gameId]);
  }

  onSearch(query: string) {
    // Subscribe to the Observable returned by getAllGames(query)
    this.gameservice.getAllGames(query).subscribe(
      (games: Games[]) => {
        // Assign the received games array to this.games
        this.games = games;
      },
      (error) => {
        // Handle error if needed
        console.error('Error fetching games:', error);
      }
    );
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
