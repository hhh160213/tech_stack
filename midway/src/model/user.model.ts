import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDTO } from '../dto/user.dto';
import { Provide, Inject } from '@midwayjs/decorator';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;
  @Inject()
  jwtService: JwtService;

  /**
   * 根据用户名和密码获取用户信息
   * @param UserLogin
   */
  async getUserByUsernameAndPassword(UserLogin: UserLoginDTO): Promise<{
    result: string;
    code: number;
    data: { database: any; token: any };
    message: string;
  }> {
    const { username, password } = UserLogin;
    const ress = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    if (ress) {
      if (ress.password !== password) {
        return {
          code: 400,
          result: 'err',
          message: '密码错误',
          data: null,
        };
      }
      if (ress.password === password && username === ress.username) {
        // eslint-disable-next-line prefer-const
        let token =
          'Bearer ' +
          this.jwtService.signSync(
            {
              id: ress.id,
              username: ress.username,
              password: ress.password,
            },
            'secret',
            { expiresIn: 7200 }
          );
        return {
          code: 200,
          result: 'success',
          message: '登录成功',
          data: {
            token: token,
            database: ress,
          },
        };
      }
    } else {
      return {
        code: 400,
        result: 'err',
        message: '账号不存在',
        data: null,
      };
    }
  }
}
