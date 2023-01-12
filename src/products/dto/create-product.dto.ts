export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  discount?: number
  image?: string;
}
