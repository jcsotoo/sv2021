import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Pedido} from './pedido.model';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Oficina} from './oficina.model';

@model({settings: {strict: false}})
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  vehiculoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'number',
    required: true,
  })
  anioProduccion: number;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  paisOrigen: string;

  @property({
    type: 'number',
    required: true,
  })
  perciocompra: number;

  @property({
    type: 'number',
    required: true,
  })
  percioAlquilerDia: number;

  @property({
    type: 'number',
    required: true,
  })
  precioAlquilerFestivo: number;

  @belongsTo(() => Asesor)
  asesorId: string;

  @hasMany(() => Pedido)
  pedidos: Pedido[];

  @belongsTo(() => TipoVehiculo)
  tipoVehiculoId: number;

  @belongsTo(() => Oficina)
  oficinaId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
