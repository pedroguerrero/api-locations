import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from './locations.service';
import { WebsocketService } from './websocket.service';
import { Location } from '../entities/locations.entity';
import { UpdateLocationDto } from '../dto/update-location.dto';

describe('LocationsService', () => {
  let publishMessage: jest.Mock;
  let service: LocationsService;
  let locationRepository: Repository<Location>;

  beforeEach(async () => {
    publishMessage = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: getRepositoryToken(Location), useValue: {} },
        { provide: WebsocketService, useValue: { publishMessage } },
        LocationsService,
      ],
    }).compile();

    service = module.get<LocationsService>(LocationsService);
    locationRepository = module.get(getRepositoryToken(Location));
  });

  describe('add', () => {
    it('Should create a new location', async () => {
      const createLocationDto = {
        name: 'Test Location',
        description: 'Test Description',
        icon: 'test-icon',
        latitude: 123.456,
        longitude: 789.012,
      };

      const location = {
        id: '1',
        ...createLocationDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      locationRepository.create = jest.fn().mockReturnValue(location);
      locationRepository.save = jest.fn().mockResolvedValue(location);

      const result = await service.add(createLocationDto);

      expect(result).toEqual(location);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.create).toHaveBeenCalled();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.save).toHaveBeenCalled();

      expect(publishMessage).toHaveBeenCalledWith(
        'addLocation',
        expect.anything(),
      );
    });
  });

  describe('getAll', () => {
    it('Should return all locations', async () => {
      const locations = [
        {
          id: '1',
          name: 'Location 1',
          description: 'Description 1',
          icon: 'icon1',
          latitude: 12.34,
          longitude: 56.78,
        },
        {
          id: '2',
          name: 'Location 2',
          description: 'Description 2',
          icon: 'icon2',
          latitude: 90.12,
          longitude: 34.56,
        },
      ];

      locationRepository.find = jest.fn().mockResolvedValue(locations);

      const response = await service.getAll();
      expect(response).toEqual(locations);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.find).toHaveBeenCalledWith({
        order: {
          createdAt: 'ASC',
        },
      });
    });
  });

  describe('getById', () => {
    it('Should return a location by id', async () => {
      const locationId = '1';
      const location = {
        id: locationId,
        name: 'Test Location',
        description: 'Test Description',
        icon: 'test-icon',
        latitude: 123.456,
        longitude: 789.012,
      };

      locationRepository.findOne = jest.fn().mockResolvedValue(location);

      const result = await service.getById(locationId);
      expect(result).toEqual(location);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.findOne).toHaveBeenCalled();
    });

    it('Should throw an error when a location is not found', () => {
      const locationId = '1';

      locationRepository.findOne = jest.fn().mockResolvedValue(null);

      void expect(
        async () => await service.getById(locationId),
      ).rejects.toThrow();
    });
  });

  describe('deleteById', () => {
    it('Should delete a location by id', async () => {
      const locationId = '1';

      locationRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await service.deleteById(locationId);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.delete).toHaveBeenCalledWith('1');

      expect(publishMessage).toHaveBeenCalledWith(
        'deleteLocation',
        expect.anything(),
      );
    });

    it('Should throw an exception when a location is not found', () => {
      const locationId = '1';

      locationRepository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      void expect(
        async () => await service.deleteById(locationId),
      ).rejects.toThrow();
    });
  });

  describe('updateById', () => {
    it('Should update a location by id', async () => {
      const locationId = '1';
      const updateLocationDto: UpdateLocationDto = {
        name: 'Updated Location',
        description: 'Updated Description',
      };

      const existingLocation = {
        id: locationId,
        name: 'Old Location',
        description: 'Old Description',
        icon: 'old-icon',
        latitude: 12.34,
        longitude: 56.78,
      };

      const updatedLocation = {
        ...existingLocation,
        ...updateLocationDto,
      };

      service.getById = jest.fn().mockResolvedValue(existingLocation);
      locationRepository.save = jest.fn().mockResolvedValue(updatedLocation);

      const result = await service.updateById(locationId, updateLocationDto);
      expect(result).toEqual(updatedLocation);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(service.getById).toHaveBeenCalledWith('1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationRepository.save).toHaveBeenCalled();

      expect(publishMessage).toHaveBeenCalledWith(
        'updateLocation',
        expect.anything(),
      );
    });

    it('Should throw an error when no fields are provided to update', () => {
      const locationId = '1';
      const updateLocationDto: UpdateLocationDto = {};

      void expect(
        async () => await service.updateById(locationId, updateLocationDto),
      ).rejects.toThrow();
    });
  });
});
