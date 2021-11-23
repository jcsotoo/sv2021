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
  Asesor,
  Pedido,
} from '../models';
import {AsesorRepository} from '../repositories';

export class AsesorPedidoController {
  constructor(
    @repository(AsesorRepository) protected asesorRepository: AsesorRepository,
  ) { }

  @get('/asesors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Asesor has many Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return this.asesorRepository.pedidos(id).find(filter);
  }

  @post('/asesors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Asesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asesor.prototype.asesorId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInAsesor',
            exclude: ['pedidoId'],
            optional: ['asesorId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'pedidoId'>,
  ): Promise<Pedido> {
    return this.asesorRepository.pedidos(id).create(pedido);
  }

  @patch('/asesors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Asesor.Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {partial: true}),
        },
      },
    })
    pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.asesorRepository.pedidos(id).patch(pedido, where);
  }

  @del('/asesors/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Asesor.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.asesorRepository.pedidos(id).delete(where);
  }
}
