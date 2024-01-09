import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JWTConstants } from 'constant';




@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: JWTConstants.secret,
           // signOptions: { expiresIn: '60s' },
           // secretOrPrivateKey: JWTConstants.secret,
        }),
        UserModule,
        ConfigModule.forRoot(),
    ],
    controllers: [AuthController],
    providers: [AuthService,],
    exports: []
})
export class AuthModule { }
