import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Games } from '../../models/games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../Services/game.service';
import { UpdateGameRequest } from '../../models/update-game-request.model';

@Component({
  selector: 'app-admin-game-update',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './admin-game-update.component.html',
  styleUrl: './admin-game-update.component.scss'
})
export class AdminGameUpdateComponent {
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
