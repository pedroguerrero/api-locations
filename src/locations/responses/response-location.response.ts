import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../entities/locations.entity';

export class ResponseLocation {
  @ApiProperty({
    type: Location,
  })
  data: Location;
}
