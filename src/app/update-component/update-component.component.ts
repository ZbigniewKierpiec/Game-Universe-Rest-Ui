import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { GameService } from '../Services/game.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Games } from '../models/games.model';
import { UpdateGameRequest } from '../models/update-game-request.model';

@Component({
  selector: 'app-update-component',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './update-component.component.html',
  styleUrl: './update-component.component.scss',
})
export class UpdateComponentComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription | undefined;
  updateSubscription?:Subscription | undefined;
  editableGame?: Games;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.gameService.getGameById(this.id).subscribe({
            next: (response) => {
              this.editableGame = response;
            },
          });
        }
      },
    });
  }

  onUpdate() {
    console.log(this.editableGame);
    const updateGameRequest: UpdateGameRequest = {
      name: this.editableGame?.name ?? '',
      type: this.editableGame?.type ?? '',
      description: this.editableGame?.description ?? '',
      rating: this.editableGame?.rating ?? 0,
      platform: this.editableGame?.platform ?? '',
      age: this.editableGame?.age ?? 0,
      price: this.editableGame?.price ?? 0,
      label: this.editableGame?.label ?? '',
      isVisible: this.editableGame?.isVisible ?? false,
    };
    if (this.id) {
    this.updateSubscription  =  this.gameService.updateGame(this.id, updateGameRequest).subscribe({
        next: () => {
          this.router.navigateByUrl('view/game');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }
}
