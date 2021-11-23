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
  Asesor,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoAsesorController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/asesor', {
    responses: {
      '200': {
        description: 'Asesor belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Asesor)},
          },
        },
      },
    },
  })
  async getAsesor(
    @param.path.number('id') id: typeof Pedido.prototype.pedidoId,
  ): Promise<Asesor> {
    return this.pedidoRepository.asesor(id);
  }
}
