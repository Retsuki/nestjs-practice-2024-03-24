import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of a coffee.' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'The description of a coffee.' })
  @IsOptional()
  readonly description: string;

  @ApiProperty({ description: 'The brand of a coffee.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: ['nescafe', 'strawberry'] })
  @IsString({ each: true }) // each: true means that each item in the array should be a string
  readonly flavors: string[];
}
