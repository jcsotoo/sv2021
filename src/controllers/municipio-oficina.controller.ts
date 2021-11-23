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
  Oficina,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioOficinaController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/oficinas', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Oficina',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Oficina)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Oficina>,
  ): Promise<Oficina[]> {
    return this.municipioRepository.oficinas(id).find(filter);
  }

  @post('/municipios/{id}/oficinas', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Oficina)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.municipioId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficina, {
            title: 'NewOficinaInMunicipio',
            exclude: ['oficinaId'],
            optional: ['municipioId']
          }),
        },
      },
    }) oficina: Omit<Oficina, 'oficinaId'>,
  ): Promise<Oficina> {
    return this.municipioRepository.oficinas(id).create(oficina);
  }

  @patch('/municipios/{id}/oficinas', {
    responses: {
      '200': {
        description: 'Municipio.Oficina PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficina, {partial: true}),
        },
      },
    })
    oficina: Partial<Oficina>,
    @param.query.object('where', getWhereSchemaFor(Oficina)) where?: Where<Oficina>,
  ): Promise<Count> {
    return this.municipioRepository.oficinas(id).patch(oficina, where);
  }

  @del('/municipios/{id}/oficinas', {
    responses: {
      '200': {
        description: 'Municipio.Oficina DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Oficina)) where?: Where<Oficina>,
  ): Promise<Count> {
    return this.municipioRepository.oficinas(id).delete(where);
  }
}
