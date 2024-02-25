declare var google: any;
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private ngZone: NgZone) {}

  logIn() {
    google.accounts.id.initialize({
      client_id:
        '67262749170-ag7o5ts5p9kguvif38ekcflv85hveupe.apps.googleusercontent.com',
      callback: (res: any) => {
        this.handleLogin(res);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'circle',
      width: 350,
    });
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    google.accounts.id.disableAutoSelect();
    this.ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.ngZone.run(() => {
        this.router.navigate(['home']);
      });
    }
  }
}
