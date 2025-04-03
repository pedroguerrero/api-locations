/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsDefined,
  IsLatitude,
  IsNotEmpty,
  IsLongitude,
} from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    description: 'Name of the location',
    example: 'Central Park',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    description: 'Description of the location',
    example: 'A large public park in New York City.',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty({
    description: 'Icon representing the location',
    example: 'https://example.com/icon.png',
    required: true,
  })
  icon: string;

  @IsNotEmpty()
  @IsDefined()
  @IsLatitude()
  @ApiProperty({
    description: 'Latitude of the location',
    example: 40.785091,
    required: true,
  })
  latitude: number;

  @IsNotEmpty()
  @IsDefined()
  @IsLongitude()
  @ApiProperty({
    description: 'Longitude of the location',
    example: -73.968285,
    required: true,
  })
  longitude: number;
}
