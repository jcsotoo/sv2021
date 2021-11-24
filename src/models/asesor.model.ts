import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Asesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  asesorId: string;

  @property({
    type: 'number',
    required: true,
  })
  nivel: number;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Asesor>) {
    super(data);
  }
}

export interface AsesorRelations {
  // describe navigational properties here
}

export type AsesorWithRelations = Asesor & AsesorRelations;
