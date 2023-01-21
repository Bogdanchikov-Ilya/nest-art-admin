import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {UsersModule} from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "../strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'test',
    signOptions: {expiresIn: '30d'}
  })],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {
}
