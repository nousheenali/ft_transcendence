import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class intraOAuthGuard extends AuthGuard('intra') {}


  /** ================================================================================================
   * 🟣🟣 
   * Injectable decorator
   * ----------------------
   * is used to mark a class as a provider , means this class can be injected
   * into another module or service
   * 🟣🟣 
   * AuthGuard
   * ---------
   * a class from passport , which is a middleware for handling authentication
   * requests
   * 
   * intraauthGuard doesnt have a constructor , it inherits everything from 
   * authguard and only changes the strategy it uses for authentication
   * ================================================================================================*/