import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  id: string;

  @IsOptional()
  update_item: string;

  @IsOptional()
  data: string;
}
