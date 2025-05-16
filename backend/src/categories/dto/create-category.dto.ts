import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría, no puede ir vació' })
  @IsString()
  name: string;
}
