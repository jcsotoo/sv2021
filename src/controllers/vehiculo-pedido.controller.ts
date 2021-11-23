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
  Vehiculo,
  Pedido,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoPedidoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Pedido',
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
    return this.vehiculoRepository.pedidos(id).find(filter);
  }

  @post('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.vehiculoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pedido, {
            title: 'NewPedidoInVehiculo',
            exclude: ['pedidoId'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) pedido: Omit<Pedido, 'pedidoId'>,
  ): Promise<Pedido> {
    return this.vehiculoRepository.pedidos(id).create(pedido);
  }

  @patch('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo.Pedido PATCH success count',
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
    return this.vehiculoRepository.pedidos(id).patch(pedido, where);
  }

  @del('/vehiculos/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Vehiculo.Pedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return this.vehiculoRepository.pedidos(id).delete(where);
  }
}
