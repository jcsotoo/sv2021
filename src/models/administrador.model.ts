import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Administrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  administradorId: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaIngreso: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
