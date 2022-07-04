import { Inject, Controller, Post, Body } from '@midwayjs/decorator';
import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';
import { Validate } from '@midwayjs/validate';

@Controller('/api')
export class APIController {
  @Inject()
  userService: UserModel;

  @Post('/user/login')
  @Validate()
  async UserByUsernameAndPassword(@Body() UserLogin: UserLoginDTO) {
    const user = await this.userService.getUserByUsernameAndPassword(UserLogin);
    return user;
  }
}
