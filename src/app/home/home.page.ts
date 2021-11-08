import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthenticationService, private router: Router) {}

  signOut(){
    this.authService.signOut()
      .then(() => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      });
  }

}
