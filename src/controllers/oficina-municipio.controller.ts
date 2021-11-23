import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Oficina,
  Municipio,
} from '../models';
import {OficinaRepository} from '../repositories';

export class OficinaMunicipioController {
  constructor(
    @repository(OficinaRepository)
    public oficinaRepository: OficinaRepository,
  ) { }

  @get('/oficinas/{id}/municipio', {
    responses: {
      '200': {
        description: 'Municipio belonging to Oficina',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async getMunicipio(
    @param.path.number('id') id: typeof Oficina.prototype.oficinaId,
  ): Promise<Municipio> {
    return this.oficinaRepository.municipio(id);
  }
}
