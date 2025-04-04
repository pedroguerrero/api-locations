import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/locations.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './services/locations.service';
import { WebsocketService } from './services/websocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationsController],
  providers: [LocationsService, WebsocketService],
})
export class LocationsModule {}
