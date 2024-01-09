import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTConstants } from 'constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
   constructor(private userService: UserService,
      private jwtService: JwtService,
    ){}


   async signIn({email, password}): Promise<any> {
     const user = await this.userService.findOneByEmail(email)
     if(user?.password !== password){
        throw new UnauthorizedException()
     }
     const payload = {id: user._id, email: user.email}

     const token = await this.jwtService.signAsync(payload)
     payload['access_token'] = token
     return { payload }
   }


    async signUp(data: any): Promise<any> {
       const result = await this.userService.createUser(data)
       console.log(result)
        return result
    }

}
