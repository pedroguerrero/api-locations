import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from './locations.controller';
import { LocationsService } from './services/locations.service';

describe('LocationsController', () => {
  let controller: LocationsController;
  let locationService: LocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [{ provide: LocationsService, useValue: {} }],
    }).compile();

    controller = module.get<LocationsController>(LocationsController);
    locationService = module.get<LocationsService>(LocationsService);
  });

  describe('addLocation', () => {
    it('Should add a new location', async () => {
      const data = {
        name: 'sampleName',
        description: 'sampleDescription',
        icon: 'sampleIcon',
        latitude: 0,
        longitude: 1,
      };

      const repositoryResponse = {
        ...data,
        id: 'sampleId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      locationService.add = jest.fn().mockResolvedValue(repositoryResponse);

      const response = await controller.addLocation(data);

      expect(response).toEqual({
        data: {
          name: 'sampleName',
          description: 'sampleDescription',
          icon: 'sampleIcon',
          latitude: 0,
          longitude: 1,
          id: 'sampleId',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          createdAt: expect.anything(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.anything(),
        },
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.add).toHaveBeenCalledWith(data);
    });
  });

  describe('getLocations', () => {
    it('Should get all locations', async () => {
      const repositoryResponse = [
        {
          id: 'sampleId',
          name: 'sampleName',
          description: 'sampleDescription',
          icon: 'sampleIcon',
          latitude: 0,
          longitude: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      locationService.getAll = jest.fn().mockResolvedValue(repositoryResponse);

      const response = await controller.getLocations();

      expect(response).toEqual({
        data: [
          {
            id: 'sampleId',
            name: 'sampleName',
            description: 'sampleDescription',
            icon: 'sampleIcon',
            latitude: 0,
            longitude: 1,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            createdAt: expect.anything(),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            updatedAt: expect.anything(),
          },
        ],
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateLocation', () => {
    it('Should update a location', async () => {
      const data = {
        name: 'sampleName',
        description: 'sampleDescription',
        icon: 'sampleIcon',
      };

      const repositoryResponse = {
        ...data,
        id: 'sampleId',
        latitude: 0,
        longitude: 1,
        updatedAt: new Date(),
      };

      locationService.updateById = jest
        .fn()
        .mockResolvedValue(repositoryResponse);

      const response = await controller.updateLocation(
        { id: 'sampleId' },
        data,
      );

      expect(response).toEqual({
        data: {
          id: 'sampleId',
          name: 'sampleName',
          description: 'sampleDescription',
          icon: 'sampleIcon',
          latitude: 0,
          longitude: 1,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.anything(),
        },
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.updateById).toHaveBeenCalledWith('sampleId', data);
    });
  });

  describe('getLocation', () => {
    it('Should get a location', async () => {
      const repositoryResponse = {
        id: 'sampleId',
        name: 'sampleName',
        description: 'sampleDescription',
        icon: 'sampleIcon',
        latitude: 0,
        longitude: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      locationService.getById = jest.fn().mockResolvedValue(repositoryResponse);

      const response = await controller.getLocation({ id: 'sampleId' });

      expect(response).toEqual({
        data: {
          id: 'sampleId',
          name: 'sampleName',
          description: 'sampleDescription',
          icon: 'sampleIcon',
          latitude: 0,
          longitude: 1,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          createdAt: expect.anything(),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.anything(),
        },
      });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.getById).toHaveBeenCalledWith('sampleId');
    });
  });

  describe('deleteLocation', () => {
    it('Should delete a location', async () => {
      locationService.deleteById = jest.fn();

      await controller.deleteLocation({ id: 'sampleId' });

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.deleteById).toHaveBeenCalledWith('sampleId');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(locationService.deleteById).toHaveBeenCalledWith('sampleId');
    });
  });
});
