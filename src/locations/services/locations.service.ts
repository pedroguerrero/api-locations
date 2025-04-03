import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Location } from '../entities/locations.entity';
import { CreateLocationDto } from '../dto/create-location.dto';
import { UpdateLocationDto } from '../dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRespository: Repository<Location>,
  ) {}

  async add(createLocationDto: CreateLocationDto): Promise<Location> {
    const { name, description, icon, latitude, longitude } = createLocationDto;
    const newLocation = this.locationRespository.create({
      name: name,
      description: description,
      icon: icon,
      latitude: latitude,
      longitude: longitude,
    });

    return await this.locationRespository.save(newLocation);
  }

  getAll(): Promise<Location[]> {
    return this.locationRespository.find();
  }

  async getById(id: string): Promise<Location> {
    const location = await this.locationRespository.findOne({
      where: { id },
    });

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    return location;
  }

  async deleteById(id: string): Promise<void> {
    const { affected } = await this.locationRespository.delete(id);

    if (!affected) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
  }

  async updateById(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    if (Object.keys(updateLocationDto).length === 0) {
      throw new BadRequestException(
        'At least one field must be provided to update the location',
      );
    }

    const location = await this.getById(id);

    const updatedLocation = {
      ...location,
      ...updateLocationDto,
    };

    return await this.locationRespository.save(updatedLocation);
  }
}
