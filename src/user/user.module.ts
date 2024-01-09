import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';
import { UserService } from './user.service';

@Module({
  imports: [
   MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // to share service in other components

})
export class UserModule {}
