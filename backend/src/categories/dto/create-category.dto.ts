import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El nombre de la categoría, no puede ir vació' })
  @IsString({ message: 'Valor no válido' })
  name: string;
}
