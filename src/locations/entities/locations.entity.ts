import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'locations',
})
export class Location {
  @ApiProperty({
    type: String,
    description: 'Unique identifier for the location',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of the location',
    example: 'Central Park',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Icon representing the location',
    example: 'icon.png',
  })
  @Column()
  icon: string;

  @ApiProperty({
    type: String,
    description: 'Description of the location',
    example: 'A large public park in New York City.',
  })
  @Column()
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Latitude of the location',
    example: 40.785091,
  })
  @Column({
    type: 'numeric',
  })
  latitude: number;

  @ApiProperty({
    type: Number,
    description: 'Longitude of the location',
    example: -73.968285,
  })
  @Column({
    type: 'numeric',
  })
  longitude: number;

  @ApiProperty({
    type: Date,
    description: 'Date when the location was created',
    example: '2023-10-01T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date when the location was last updated',
    example: '2023-10-01T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
