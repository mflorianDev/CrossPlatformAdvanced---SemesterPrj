import { Injectable } from '@angular/core';
import { RemoteConfig, getAll, Value, getValue, getBoolean, fetchAndActivate } from '@angular/fire/remote-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config;

  constructor( private remoteConfig: RemoteConfig ) {
    this.fetchRemoteConfig();
  }

  private fetchRemoteConfig(): void {
    fetchAndActivate(this.remoteConfig).then(() => {
      //console.log(getValue(this.remoteConfig, 'myParam').asString());
      this.config = getAll(this.remoteConfig);
      console.log(this.config.myParam.asString());
    });
  }
}
