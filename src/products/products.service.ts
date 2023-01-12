import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { FileService } from "../file/file.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private FileService: FileService
  ) {
  }

  async create(createProductDto: CreateProductDto, image: any) {
    const fileName = await this.FileService.createFile(image)
    console.log(fileName)
    // return this.productRepository.save(createProductDto)
    return this.productRepository.save({...createProductDto, image: fileName})
  }

  findAll() {
    return  this.productRepository.find()
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({id})
  }

  async update(id: number, updateProductDto: UpdateProductDto, image: any) {
    const fileName = await this.FileService.createFile(image)
    const find = await this.productRepository.findOneBy({id})
    if(!find){
      throw new NotFoundException('Товар не найден')
    }
    await this.productRepository.update(id, {...updateProductDto, image: fileName})
    return this.productRepository.findOneBy({id})
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
