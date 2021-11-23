import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Oficina,
  Vehiculo,
} from '../models';
import {OficinaRepository} from '../repositories';

export class OficinaVehiculoController {
  constructor(
    @repository(OficinaRepository) protected oficinaRepository: OficinaRepository,
  ) { }

  @get('/oficinas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Oficina has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.oficinaRepository.vehiculos(id).find(filter);
  }

  @post('/oficinas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Oficina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Oficina.prototype.oficinaId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInOficina',
            exclude: ['vehiculoId'],
            optional: ['oficinaId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'vehiculoId'>,
  ): Promise<Vehiculo> {
    return this.oficinaRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/oficinas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Oficina.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.oficinaRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/oficinas/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Oficina.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.oficinaRepository.vehiculos(id).delete(where);
  }
}
