import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Auth/Services/auth.service';
import { User } from '../Auth/Auth Models/user.model';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  user?: User;
  isSticky: boolean = false;
  navbarHeight: number = 0;
  pageTopOffset: number = 0;
  constructor(private authService: AuthService, private router: Router) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Calculate the bottom of the navbar relative to the viewport
    const navbarBottom = this.pageTopOffset + this.navbarHeight;

    if (scrollOffset >= navbarBottom) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnInit(): void {
    this.navbarHeight = document.getElementById('navbar')!.offsetHeight;
    this.pageTopOffset = document.getElementById('navbar')!.offsetTop;

    this.authService.user().subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;
      },
    });

    this.user = this.authService.getUser();
  }
}
