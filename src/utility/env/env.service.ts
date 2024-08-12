import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from './env.schema';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<ENV, true>) {}

  get<K extends keyof ENV>(name: K) {
    return this.configService.get(name, { infer: true });
  }
}
