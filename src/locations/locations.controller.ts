import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ParamLocationId } from './dto/param-location-id';
import { LocationsService } from './services/locations.service';
import { ResponseLocation } from './responses/response-location.response';
import { ResponseLocations } from './responses/response-locations.response';

@ApiTags('locations')
@Controller('api/v1/locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @ApiCreatedResponse({
    description: 'Location created successfully',
    type: ResponseLocation,
  })
  @ApiBadRequestResponse({
    description: 'Validations errors',
  })
  @Post()
  async addLocation(
    @Body() createLocationDto: CreateLocationDto,
  ): Promise<ResponseLocation> {
    const location = await this.locationService.add(createLocationDto);

    return { data: location };
  }

  @ApiOkResponse({
    description: 'Locations retrieved successfully',
    type: ResponseLocations,
  })
  @Get()
  async getLocations(): Promise<ResponseLocations> {
    const locations = await this.locationService.getAll();

    return { data: locations };
  }

  @ApiOkResponse({
    description: 'Location updated successfully',
    type: ResponseLocation,
  })
  @ApiBadRequestResponse({
    description: 'Validations errors',
  })
  @ApiNotFoundResponse({
    description: 'Location not found',
  })
  @Put(':id')
  async updateLocation(
    @Param() { id }: ParamLocationId,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<ResponseLocation> {
    const response = await this.locationService.updateById(
      id,
      updateLocationDto,
    );

    return { data: response };
  }

  @ApiOkResponse({
    description: 'Location retrieved successfully',
    type: ResponseLocation,
  })
  @ApiNotFoundResponse({
    description: 'Location not found',
  })
  @Get(':id')
  async getLocation(
    @Param() { id }: ParamLocationId,
  ): Promise<ResponseLocation> {
    const response = await this.locationService.getById(id);

    return { data: response };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Location deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Location not found',
  })
  @Delete(':id')
  async deleteLocation(@Param() { id }: ParamLocationId): Promise<void> {
    await this.locationService.deleteById(id);
  }
}
