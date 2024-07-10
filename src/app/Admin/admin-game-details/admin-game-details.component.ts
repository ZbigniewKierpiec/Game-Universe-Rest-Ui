import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';
import { Games } from '../../models/games.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../Services/game.service';

@Component({
  selector: 'app-admin-game-details',
  standalone: true,
  imports: [NgFor, AsyncPipe, NgIf, FontAwesomeModule],
  templateUrl: './admin-game-details.component.html',
  styleUrl: './admin-game-details.component.scss'
})
export class AdminGameDetailsComponent {
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

  update() {
    this.router.navigate(['admin/game-update', this.id]);
  }

  delete() {
    if(this.id){
      this.deleteSubscription  =   this.gameService.deleteGame(this.id)
   .subscribe({
        next:(response)=>{
               console.log(response)
               this.router.navigateByUrl('view/game');
        }
      })
    }

  }

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
