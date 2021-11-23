import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Municipio,
  Departamento,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioDepartamentoController {
  constructor(
    @repository(MunicipioRepository)
    public municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Municipio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Municipio.prototype.municipioId,
  ): Promise<Departamento> {
    return this.municipioRepository.departamento(id);
  }
}
