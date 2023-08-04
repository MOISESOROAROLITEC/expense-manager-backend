import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(token: string): Promise<any> {
    const user = await this.userService.getUserByToken(token);
    if ( user ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}