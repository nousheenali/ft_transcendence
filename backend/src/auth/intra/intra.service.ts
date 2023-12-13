import { Injectable } from '@nestjs/common';

import { JwtAuthService } from '../jwt/jwt.service';
import { AuthTokens } from '../dto/jwt.dto';

import { IntraUserProfile } from '../dto/intra.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';

@Injectable()
export class IntraService {
  constructor(
    private userService: UserService,
    private jwtAuthService: JwtAuthService,
  ) {}
  async login(intraUser: IntraUserProfile): Promise<AuthTokens> {
    
    let user = await this.userService.getUserByLogin(intraUser.login);
    if (!user) {
      const dto = new CreateUserDto();
      dto.login = intraUser.login;
      dto.name = intraUser.firstName + ' ' + intraUser.lastName;
      dto.email = intraUser.email;
      dto.avatar = intraUser.avatar;
      user = await this.userService.createUser(dto);
    } else {
      if (user.TFAEnabled === true) {
        user = await this.userService.setTFAVerificationRequired(
          intraUser.login,
        );
      }
    }
    return this.jwtAuthService.generateJwt(user);
  }
}
