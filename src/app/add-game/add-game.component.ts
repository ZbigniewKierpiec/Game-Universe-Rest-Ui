import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddGameRequest } from '../models/add-game-request.model';
import { GameService } from '../Services/game.service';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss',
})
export class AddGameComponent {
  private addgamesSubscription?: Subscription;
  model: AddGameRequest;

  constructor(private router: Router, private GameService: GameService) {
    this.model = {
      Name: '',
      Type: '',
      Description: '',
      Rating: 0,
      Platform: '',
      Age: 0,
      Price: 0,
      Label: '',
      IsVisible: false,
    };
  }

  addNewGame() {
    const missingFields = this.validateForm();

    if (missingFields.length === 0) {
      this.addgamesSubscription = this.GameService.addGame(
        this.model
      ).subscribe({
        next: (response) => {
          console.log('Added Game Successfully');
          this.resetForm(); // Reset form after successful submission

          this.router.navigateByUrl('view/game');
        },
        error: (error) => {
          console.error('Error adding game:', error);
        },
      });
    } else {
      const missingFieldsString = missingFields.join(', ');
      console.error(
        'Please fill in the following required fields: ' + missingFieldsString
      );
      // Optionally, you can display an alert or notification to the user here
      alert(
        'Please fill in the following required fields: ' + missingFieldsString
      );
    }
  }

  validateForm(): string[] {
    let missingFields = [];

    if (this.model.Name === '') missingFields.push('Name');
    if (this.model.Type === '') missingFields.push('Type');
    if (this.model.Description === '') missingFields.push('Description');
    if (this.model.Rating === null || this.model.Rating === 0)
      missingFields.push('Rating');
    if (this.model.Platform === '') missingFields.push('Platform');
    if (this.model.Age === null || this.model.Age === 0)
      missingFields.push('Age');
    if (this.model.Price === null || this.model.Price === 0)
      missingFields.push('Price');
    if (this.model.Label === '') missingFields.push('Label');

    return missingFields;
  }

  resetForm() {
    this.model = {
      Name: '',
      Type: '',
      Description: '',
      Rating: 0,
      Platform: '',
      Age: 0,
      Price: 0,
      Label: '',
      IsVisible: false,
    };
  }

  ngOnDestroy(): void {
    if (this.addgamesSubscription) {
      this.addgamesSubscription.unsubscribe();
    }
  }
}
