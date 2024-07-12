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
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 6;
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

  sort(sortBy: string, sortDirection: string) {
    this.gameservice.getAllGames(undefined, sortBy, sortDirection).subscribe(
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

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.viewGamesSubscription = this.gameservice
      .getAllGames(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.games = response;
        },
      });
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;
    this.viewGamesSubscription = this.gameservice
      .getAllGames(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.games = response;
        },
      });
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }
    this.pageNumber += 1;
    this.viewGamesSubscription = this.gameservice
      .getAllGames(
        undefined,
        undefined,
        undefined,
        this.pageNumber,
        this.pageSize
      )
      .subscribe({
        next: (response) => {
          this.games = response;
        },
      });
  }

  // ngOnInit(): void {
  //   this.cdr.detectChanges();
  //   this.viewGamesSubscription = this.gameservice.getAllGames(
  //    undefined,undefined,undefined,this.pageNumber,this.pageSize

  //   ).subscribe({
  //     next: (response) => {
  //       this.games = response;
  //     },

  //   });

  //   this.gameservice.getGameCount().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.totalCount = data;
  //     },
  //   });
  // }

  ngOnInit(): void {
    this.cdr.detectChanges();

    this.gameservice.getGameCount().subscribe({
      next: (data) => {
        console.log(data);
        this.totalCount = data;
        this.list = new Array(Math.ceil(data / this.pageSize));
        this.viewGamesSubscription = this.gameservice
          .getAllGames(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          )
          .subscribe({
            next: (response) => {
              this.games = response;
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.viewGamesSubscription?.unsubscribe();
  }
}
