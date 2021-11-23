import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Municipio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  municipioId: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Municipio>) {
    super(data);
  }
}

export interface MunicipioRelations {
  // describe navigational properties here
}

export type MunicipioWithRelations = Municipio & MunicipioRelations;
