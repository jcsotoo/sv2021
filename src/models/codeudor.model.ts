import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Codeudor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codeudorId: string;

  @property({
    type: 'string',
    required: true,
  })
  cartaLaboral: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Codeudor>) {
    super(data);
  }
}

export interface CodeudorRelations {
  // describe navigational properties here
}

export type CodeudorWithRelations = Codeudor & CodeudorRelations;
