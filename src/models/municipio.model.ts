import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Usuario} from './usuario.model';
import {Oficina} from './oficina.model';

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

  @belongsTo(() => Departamento)
  departamentoId: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @hasMany(() => Oficina)
  oficinas: Oficina[];
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
