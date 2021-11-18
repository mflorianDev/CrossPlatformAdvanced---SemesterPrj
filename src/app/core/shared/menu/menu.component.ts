import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) {  }

  ngOnInit() {}

  goNewTour(){
    this.router.navigateByUrl('new-tour');
  }

  goHome(){
    this.router.navigateByUrl('home');
  }

  goTracking(){
    this.router.navigateByUrl('tracking');
  }


  signOut(){
    this.authService.signOut()
      .then(() => {
        this.router.navigateByUrl('/', { replaceUrl: true });
      });
  }

}
