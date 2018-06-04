import { Injectable } from '@nestjs/common';

import * as readPkg from 'read-pkg';

@Injectable()
export class Environments {
  public static getEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  public static getPackageVersion() {
    readPkg().then(result => {
      return result.version;
    });
  }

  public static isTest(): boolean {
    return this.getEnv() === 'test';
  }

  public static isDev(): boolean {
    return this.getEnv() === 'development';
  }

  public static isProd(): boolean {
    return this.getEnv() === 'production';
  }

  public static getRedisHost(): string {
    return process.env.REDIS_HOST;
  }

  public static getRedisPort(): string {
    return process.env.REDIS_HOST;
  }

  public static isEnabled(bool: string): boolean {
    try {
      return bool.toLowerCase() === 'true';
    } catch (e) {
      return false;
    }
  }
}
