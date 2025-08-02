import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString({ message: 'Nombre no válido' })
  name: string;

  @IsNotEmpty({ message: 'La Imagen del producto es obligatoria' })
  image: string;

  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio no válido' })
  price: number;

  @IsNotEmpty({ message: 'El stock del producto es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Stock no válido' })
  stock: number;

  @IsNotEmpty({ message: 'La categoría del producto es obligatorio' })
  @IsInt({ message: 'Categoría no válida' })
  categoryId: number;
}
