import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
