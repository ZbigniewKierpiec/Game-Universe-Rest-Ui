import { Component } from '@angular/core';
import { LoginRequest } from '../Auth Models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  model: LoginRequest;

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.auth.login(this.model).subscribe({
      next: (response) => {
        console.log(response.token);
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        this.model.email = '';
        this.model.password = '';

        this.auth.setUser({
          email: response.email,
          roles: response.roles,
        });

        this.router.navigateByUrl('view/game');
      },
    });
  }
}
