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
  Departamento,
  Municipio,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoMunicipioController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/municipios', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Municipio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Municipio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Municipio>,
  ): Promise<Municipio[]> {
    return this.departamentoRepository.municipios(id).find(filter);
  }

  @post('/departamentos/{id}/municipios', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Municipio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.deptoId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {
            title: 'NewMunicipioInDepartamento',
            exclude: ['municipioId'],
            optional: ['departamentoId']
          }),
        },
      },
    }) municipio: Omit<Municipio, 'municipioId'>,
  ): Promise<Municipio> {
    return this.departamentoRepository.municipios(id).create(municipio);
  }

  @patch('/departamentos/{id}/municipios', {
    responses: {
      '200': {
        description: 'Departamento.Municipio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {partial: true}),
        },
      },
    })
    municipio: Partial<Municipio>,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.departamentoRepository.municipios(id).patch(municipio, where);
  }

  @del('/departamentos/{id}/municipios', {
    responses: {
      '200': {
        description: 'Departamento.Municipio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Municipio)) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.departamentoRepository.municipios(id).delete(where);
  }
}
