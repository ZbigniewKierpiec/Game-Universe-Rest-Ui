import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../Services/game.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Games } from '../models/games.model';

@Component({
  selector: 'app-games-detail',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, FontAwesomeModule],
  templateUrl: './games-detail.component.html',
  styleUrl: './games-detail.component.scss',
})
export class GamesDetailComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription | undefined;
  deleteSubscription?: Subscription | undefined;
  game?: Games;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.gameService.getGameById(this.id).subscribe({
            next: (response) => {
              this.game = response;

            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}
