import {forwardRef, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./users/user.module";
import {AuthModule} from "./auth/auth.module";
import {ThrottlerModule} from "@nestjs/throttler";
import {ConfigModule} from "@nestjs/config";
import {MailerModule} from "@nestjs-modules/mailer";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import * as process from "node:process";

@Module({
  imports: [
      ConfigModule.forRoot(),
      ThrottlerModule.forRoot(),
      forwardRef(() =>UserModule),
      forwardRef(() =>AuthModule),
      MailerModule.forRoot({
          transport: {
              host: process.env.HOSTMAIL,
              port: Number(process.env.PORTMAIL),
              auth:{
                  user: process.env.USERMAIL,
                  pass: process.env.PASSWORDMAIL
              }
          },
          defaults:{
              from: '"nest-modules" <modules@nestjs.com>'
          },
          template:{
              dir: __dirname + '/templates',
              adapter: new PugAdapter(),
              options:{
                  strict: true,
              },
          },
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
