import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Oficina,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoOficinaController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/oficina', {
    responses: {
      '200': {
        description: 'Oficina belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oficina)},
          },
        },
      },
    },
  })
  async getOficina(
    @param.path.string('id') id: typeof Vehiculo.prototype.vehiculoId,
  ): Promise<Oficina> {
    return this.vehiculoRepository.oficina(id);
  }
}
