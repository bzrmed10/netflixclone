import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @Input({ required: true }) name: string = '';
  @Input({ required: true }) profilePic: string = '';
  toggelMenu: boolean = false;

  navlist: string[] = [
    'Home',
    'Tv Shows',
    'Movies',
    'News & Popular',
    'My List',
  ];

  signOut() {
    this.authService.signOut();
  }

  onToggelMenu() {
    this.toggelMenu = !this.toggelMenu;
  }
}
