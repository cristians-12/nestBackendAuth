import {
  IsEmail,
  IsStrongPassword,
  ArrayUnique,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  @ArrayUnique()
  favorites: number[];
}
