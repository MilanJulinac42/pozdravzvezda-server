import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvService } from 'src/utility/env/env.service';
import { MIGRATIONS_TABLE } from '../../migrations/config';

const migrationsPath = path.join(
  __dirname,
  '..',
  '..',
  'migrations',
  'history',
  '*.js',
);

export const getDbConfig = (envService: EnvService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: envService.get('DATABASE_HOST'),
    port: envService.get('DATABASE_PORT'),
    username: envService.get('DATABASE_USER'),
    password: envService.get('DATABASE_PASSWORD'),
    database: envService.get('DATABASE_NAME'),
    entities: [path.join(__dirname, '..', 'src', '**', '*.entity.js')],
    migrationsTableName: MIGRATIONS_TABLE,
    migrations: [migrationsPath],
    migrationsRun: true,
    migrationsTransactionMode: 'each',
    synchronize: false,
    retryAttempts: 1,
    autoLoadEntities: false,
    logging: ['error', 'warn'],
    poolSize: envService.get('DATABASE_POOLSIZE'),
  };
};
