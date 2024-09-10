import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() +
        parseInt(
          this.configService.getOrThrow<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ), // Tiempo de expire de token JWT generado.
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const accessToken = this.jwtService.sign(tokenPayload, {
      //firmando el token JWT.
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      //eN CUANTO EXPIRA
      expiresIn: `${this.configService.getOrThrow(
        'JWT_ACCESS_TOKEN_EXPIRATION_MS',
      )}ms`,
    });

    // solo sera accesible desde el servidor
    response.cookie('Authentification', accessToken, {
      httpOnly: false,
      // sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production', //para produccion solamente
      expires: expiresAccessToken,
    });
    return user;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({
        email,
      });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials not valid');
    }
  }
}
