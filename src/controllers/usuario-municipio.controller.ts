import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Municipio,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMunicipioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/municipio', {
    responses: {
      '200': {
        description: 'Municipio belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async getMunicipio(
    @param.path.string('id') id: typeof Usuario.prototype.usuarioId,
  ): Promise<Municipio> {
    return this.usuarioRepository.municipio(id);
  }
}
