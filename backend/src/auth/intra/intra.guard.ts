import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class intraOAuthGuard extends AuthGuard('intra') {}
