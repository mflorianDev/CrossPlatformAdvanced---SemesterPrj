import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getAll, Value } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Record<string, Value>;

  constructor(private remoteConfig: RemoteConfig) { }

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

}
