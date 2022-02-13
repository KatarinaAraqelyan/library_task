import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  description: string;
}
