import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Municipio,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteMunicipioController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/municipio', {
    responses: {
      '200': {
        description: 'Municipio belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async getMunicipio(
    @param.path.string('id') id: typeof Cliente.prototype.clienteId,
  ): Promise<Municipio> {
    return this.clienteRepository.municipio(id);
  }
}
