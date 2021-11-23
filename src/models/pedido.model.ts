import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Asesor} from './asesor.model';
import {Codeudor} from './codeudor.model';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Pedido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  pedidoId?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  tipoSolicitud: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @belongsTo(() => Codeudor)
  codeudorId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
