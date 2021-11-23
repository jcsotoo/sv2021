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
  Municipio,
  Usuario,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioUsuarioController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.municipioRepository.usuarios(id).find(filter);
  }

  @post('/municipios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.municipioId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInMunicipio',
            exclude: ['usuarioId'],
            optional: ['municipioId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'usuarioId'>,
  ): Promise<Usuario> {
    return this.municipioRepository.usuarios(id).create(usuario);
  }

  @patch('/municipios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Municipio.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.municipioRepository.usuarios(id).patch(usuario, where);
  }

  @del('/municipios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Municipio.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.municipioRepository.usuarios(id).delete(where);
  }
}
