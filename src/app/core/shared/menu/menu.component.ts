import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  trackingEnabled: boolean;

  constructor(private router: Router, private authService: AuthenticationService, private configService: ConfigService) {  }

  ngOnInit() {
    this.isTrackingEnabled();
  }

  // load remoteConfig value for "trackingEnabled"
  async isTrackingEnabled() {
    this.trackingEnabled = await this.configService.getConfig().then((config) => config.trackingEnabled.asBoolean());
  }

  goNewTour(){
    this.router.navigateByUrl('new-tour');
  }

  goHome(){
    this.router.navigateByUrl('overview-tours');
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
