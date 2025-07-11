import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'El nombre del cupón es obligatorio' })
  name: string;

  @IsNotEmpty({ message: 'El descuento es obligatorio' })
  @IsInt({ message: 'El descuento deber ser entre 1 y 100' })
  @Max(100, { message: 'El descuento máximo es de 100' })
  @Min(1, { message: 'El descuento mínimo es de 1' })
  percentage: number;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDateString({}, { message: 'Fecha no válida' })
  expirationDate: Date;
}
