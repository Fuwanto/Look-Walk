import { IsNotEmpty } from 'class-validator';

export class ApplyCouponDto {
  @IsNotEmpty({ message: 'El nombre del cupón es obligatorio' })
  name: string;
}
