import {Entity, model, property, hasMany} from '@loopback/repository';
import {Municipio} from './municipio.model';

@model({settings: {strict: false}})
export class Departamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  deptoId: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Municipio)
  municipios: Municipio[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
