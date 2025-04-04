import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@Injectable()
@WebSocketGateway()
export class WebsocketService {
  @WebSocketServer() io: Server;

  publishMessage(event: string, data: any) {
    this.io.emit(event, data);
  }
}
