import { Injectable, OnDestroy } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getAll, Value } from '@angular/fire/remote-config';
import { Observable, Subscription } from 'rxjs';
import { AllParameters } from 'rxfire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService implements OnDestroy {
  private config: Record<string, Value>;
  private configObservable: Observable<AllParameters>;
  private configSubscribtion: Subscription;

  constructor(private remoteConfig: RemoteConfig) { }

  ngOnDestroy(): void {
  }

  // return fetched config values
  async getConfig(): Promise<Record<string, Value>> {
    await this.fetchRemoteConfig();
    return this.config;
  }

  // fetch and activate remote config from backend
  private async fetchRemoteConfig(): Promise<void> {
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3000;
    await fetchAndActivate(this.remoteConfig);
    this.config = getAll(this.remoteConfig);
  }

  /*
  // Load all configuration values from RemoteConfig and subscribe
  private async fetchRemoteConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      fetchAndActivate(this.remoteConfig).then(() => {
        this.configSubscribtion = getAll(this.remoteConfig).subscribe(
          (params) => {
            this.config = params;
            console.log('params: ', params);
            resolve(true);
          }
        );
      });
    });
  }
  */
}
