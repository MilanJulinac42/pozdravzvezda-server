import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseAdmin } from 'src/config/firebase.setup';

@Module({
  providers: [UserService, FirebaseAdmin],
  controllers: [UserController],
})
export class UserModule {}
