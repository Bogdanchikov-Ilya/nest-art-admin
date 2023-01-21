import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./users/entities/user.entity";
import { Product } from "./products/entities/product.entity";
import { ProductsModule } from "./products/products.module";
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { UsersService } from "./users/users.service";
// ServeStaticModule - модуль чтобы сервер могу отдавать статику (картинки, файлы)
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Product],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    // ServeStaticModule - модуль чтобы сервер могу отдавать статику (картинки, файлы)
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    UsersModule,
    ProductsModule,
    FileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, FileService]
})
export class AppModule {
}
