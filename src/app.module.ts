import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './utility/env/env.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from './utility/env/env.module';
import { EnvService } from './utility/env/env.service';
import { getDbConfig } from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => getDbConfig(envService),
    }),
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
