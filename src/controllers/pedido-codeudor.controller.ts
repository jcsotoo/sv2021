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
  Codeudor,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoCodeudorController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Codeudor belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Codeudor)},
          },
        },
      },
    },
  })
  async getCodeudor(
    @param.path.number('id') id: typeof Pedido.prototype.pedidoId,
  ): Promise<Codeudor> {
    return this.pedidoRepository.codeudor(id);
  }
}
