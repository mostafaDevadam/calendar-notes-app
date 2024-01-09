import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTConstants, secret } from 'constant';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{


    const req = context.switchToHttp().getRequest()
    const token_ = this.getToken(req)
    if(!token_) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token_, {
           secret: JWTConstants.secret,
      })
      req['user'] = payload

    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }


  private getToken(request: Request): string | any {
    const token = request.headers['auth-token'] || request.body.token
     || request.query.token || request.headers['x-access-token']
    return token
  }

}
