import { Server } from 'socket.io';
import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketService } from './websocket.service';

describe('WebsocketService', () => {
  let mockServer: Server;
  let service: WebsocketService;

  beforeEach(async () => {
    mockServer = {
      emit: jest.fn(),
    } as unknown as Server;

    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketService],
    }).compile();

    service = module.get<WebsocketService>(WebsocketService);
    service.io = mockServer;
  });

  describe('publishMessage', () => {
    it('Should publish a message with the correct event and data', () => {
      const event = 'testEvent';
      const data = { key: 'value' };

      service.publishMessage(event, data);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockServer.emit).toHaveBeenCalledWith(event, data);
    });
  });
});
