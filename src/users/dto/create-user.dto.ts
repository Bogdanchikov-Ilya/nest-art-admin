import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  name: string;
  @IsEmail(undefined, { message: 'Невалидная почта' })
  email: string;
  @Length(6, 30, { message: 'Пароль от 6 до 30 символов' })
  password: string;
}
