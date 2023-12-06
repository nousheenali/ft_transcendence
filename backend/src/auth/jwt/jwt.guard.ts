import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Log information about the incoming request
    // console.log(
    //   'Request to AccessTokenGuard:',
    //   request.method,
    //   request.url,
    //   request.headers,
    // );

    // You can add additional logic here if needed

    // Call the parent canActivate method
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // If an error occurred during token verification, handle it here
    if (err || !user) {
      // You can log the error or handle it according to your requirements
      throw new UnauthorizedException();
    }

    // If the token is valid, you can return the user or perform additional checks
    return user;
  }
}
