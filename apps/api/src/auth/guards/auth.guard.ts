import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from 'lib/firebase';
// import * as jose from 'jose';

// const kindeJKWSUrl = 'https://nourri.kinde.com/.well-known/jwks';
// const options = {
//   issuer: 'urn:example:issuer',
//   audience: 'urn:example:audience',
// };

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    const decodedToken = await auth.verifyIdToken(token);
    console.log('🚀 ~ AuthGuard ~ canActivate ~ decodedToken:', decodedToken);

    // const auth = getAuth();
    // const decodedToken = await auth.
    // Fetch Json Web Key Set
    // const JWKS = jose.createRemoteJWKSet(new URL(kindeJKWSUrl));
    // Verify Token
    // const payload = await this.verifyToken(token, JWKS, options);
    // if (!payload) throw new UnauthorizedException();
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // private async verifyToken(
  //   jwt: string | Uint8Array,
  //   key: any,
  //   options?: jose.JWTVerifyOptions,
  // ) {
  //   if (!jwt || !key) return;
  //   try {
  //     const { payload } = await jose.jwtVerify(jwt, key, options);
  //     return payload;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
