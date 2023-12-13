import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from '@nestjs/axios';
import { IntraUserProfile } from '../dto/intra.dto';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, 'intra') {
  constructor(private httpService: HttpService) {
    // call the constructor of parent class, Passportstrategy
    // The call to super ensures that the parent class is properly initialized
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.INTRA_CLIENT_ID,
      clientSecret: process.env.INTRA_CLIENT_SECRET,
      callbackURL: process.env.INTRA_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    _profile: any,
    callback: VerifyCallback,
  ): Promise<void> {
    try {
      const user = await this.httpService.axiosRef.get(
        'https://api.intra.42.fr/v2/me',
        {
          params: { access_token: accessToken },
        },
      );
      const profile: IntraUserProfile = {
        login: user.data.login,
        avatar: user.data.image?.link,
        email: user.data.email,
        firstName: user.data.first_name,
        lastName: user.data.last_name,
      };
      // On successful authentication, call the callback with null error and the user profile
      // use the callback function provided by Passport to communicate the outcome of your
      // authentication logic back to Passport

      callback(null, profile); // On success, we call the callback with null error and the user profile
    } catch (error) {
      callback(error); // On error, we call the callback with the error
    }
  }
}

/** ================================================================================================
 * 🟣🟣 ouath2 flow
 * REGISTER THE REDIRECT URL IN 42 INTRA TO WHERE THE USER SHOULD BE REDIRECTED AFTER AUTHNETICATION
 * USER WILL BE REDIRECTED TO 'authorize' URL where they can select to authorize and grant access to their intra account
 * AFTER THE PERMISSION GRANT, the provider redirects back to the application with a code
 * after the code is received, make a request the tokenURL , this request is server-to-server , not visisble to the user
 * this request returns the accesstoken in exchange of the authorization code, with client id & client secret
 * once the access_token is obtained , it calls the validate function
 * after the user is validated , control is given back to the passport from where it redirects to
 * the callback url
 * ================================================================================================*/

/** ================================================================================================
   * 🟣🟣 ouath2 flow
    Passport uses the strategy configuration (set up in the constructor) to redirect the user to the authorizationURL. 
    This is where the user will log in and authorize your application.
   * ================================================================================================*/
