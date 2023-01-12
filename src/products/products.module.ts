import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { Product } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileModule } from "../file/file.module";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), FileModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
