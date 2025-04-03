import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../entities/locations.entity';

export class ResponseLocations {
  @ApiProperty({
    type: [Location],
  })
  data: Location[];
}
