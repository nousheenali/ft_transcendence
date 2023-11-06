import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from '@nestjs/axios';
import { IntraUserProfile } from '../dto/intra.dto';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
  constructor(private httpService: HttpService) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.INTRA_CLIENT_ID,
      clientSecret: process.env.INTRA_CLIENT_SECRET,
      callbackURL: process.env.INTRA_CALLBACK_URL,
      proxy: true,
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    _profile: any,
    callback: VerifyCallback,
  ): Promise<void> {
    try {
      const user = await this.httpService.axiosRef.get('https://api.intra.42.fr/v2/me', {
        params: { access_token: accessToken },
      });
      const profile: IntraUserProfile = {
        login: user.data.login,
        avatar: user.data.image?.link, // It's good to use optional chaining here
        email: user.data.email,
        firstName: user.data.first_name,
        lastName: user.data.last_name,
      };
      callback(null, profile); // On success, we call the callback with null error and the user profile
    } catch (error) {
      callback(error); // On error, we call the callback with the error
    }
  }
}
