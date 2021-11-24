import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Vehiculo,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoVehiculoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.string('id') id: typeof Pedido.prototype.pedidoId,
  ): Promise<Vehiculo> {
    return this.pedidoRepository.vehiculo(id);
  }
}
