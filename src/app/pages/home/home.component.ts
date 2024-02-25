import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/components/header/header.component';
import { AuthService } from '../../shared/services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  name: string = '';
  email: string = '';
  profilePic: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    const userData = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    console.log(userData);
    this.name = userData.name || '';
    this.email = userData.email || '';
    this.profilePic = userData.picture || '';
  }

  signOut() {
    this.authService.signOut();
  }
}
