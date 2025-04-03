/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the location',
    example: 'Central Park',
    required: false,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the location',
    example: 'A large public park in New York City.',
    required: false,
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Icon representing the location',
    example: 'https://example.com/icon.png',
    required: false,
  })
  icon: string;
}
