import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Municipio} from './municipio.model';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Oficina extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  oficinaId?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  @belongsTo(() => Municipio)
  municipioId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Oficina>) {
    super(data);
  }
}

export interface OficinaRelations {
  // describe navigational properties here
}

export type OficinaWithRelations = Oficina & OficinaRelations;
