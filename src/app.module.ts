import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
     rootPath: join(__dirname, '..', '/assets/images'), //'/files'),
     renderPath: 'uploads',
     exclude: ['/api/(.*)']
    }),

    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_LOCAL),
    AuthModule,
    UserModule,
    NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
