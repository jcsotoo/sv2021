import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pedido} from './pedido.model';

@model({settings: {strict: false}})
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  clienteId: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];


  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
