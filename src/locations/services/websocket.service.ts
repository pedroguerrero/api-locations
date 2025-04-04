import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketService {
  @WebSocketServer() io: Server;

  publishMessage(event: string, data: any) {
    this.io.emit(event, data);
  }
}
