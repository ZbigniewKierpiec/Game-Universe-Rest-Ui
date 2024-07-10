import { Component, NgModule } from '@angular/core';

import { LayoutComponent } from './layout/layout.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LayoutComponent],
})
export class AppComponent {}
