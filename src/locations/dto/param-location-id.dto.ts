/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParamLocationIdDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID of the location',
    example: '3b9543cd-c41f-4a11-8b96-9443732f2c06',
    required: true,
  })
  id: string;
}
