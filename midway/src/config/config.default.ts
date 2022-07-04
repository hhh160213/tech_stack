import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from "../entity/user.entity";

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1656656269434_5389',
  koa: {
    port: 7001,
  },
  orm:{
    type:"mysql",
    host:'127.0.0.1',
    port:3306,
    username:'root',
    password:'root',
    database:'mememory',
    logging:false,
    synchronize:true,
    entities: [UserEntity],
  },
  jwt:{
    secret:'secret',
    expiresIn:'2d'
  }
} as MidwayConfig;
