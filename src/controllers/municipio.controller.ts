import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Municipio} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioController {
  constructor(
    @repository(MunicipioRepository)
    public municipioRepository : MunicipioRepository,
  ) {}

  @post('/municipios')
  @response(200, {
    description: 'Municipio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Municipio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {
            title: 'NewMunicipio',
            
          }),
        },
      },
    })
    municipio: Municipio,
  ): Promise<Municipio> {
    return this.municipioRepository.create(municipio);
  }

  @get('/municipios/count')
  @response(200, {
    description: 'Municipio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Municipio) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.municipioRepository.count(where);
  }

  @get('/municipios')
  @response(200, {
    description: 'Array of Municipio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Municipio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Municipio) filter?: Filter<Municipio>,
  ): Promise<Municipio[]> {
    return this.municipioRepository.find(filter);
  }

  @patch('/municipios')
  @response(200, {
    description: 'Municipio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {partial: true}),
        },
      },
    })
    municipio: Municipio,
    @param.where(Municipio) where?: Where<Municipio>,
  ): Promise<Count> {
    return this.municipioRepository.updateAll(municipio, where);
  }

  @get('/municipios/{id}')
  @response(200, {
    description: 'Municipio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Municipio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Municipio, {exclude: 'where'}) filter?: FilterExcludingWhere<Municipio>
  ): Promise<Municipio> {
    return this.municipioRepository.findById(id, filter);
  }

  @patch('/municipios/{id}')
  @response(204, {
    description: 'Municipio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Municipio, {partial: true}),
        },
      },
    })
    municipio: Municipio,
  ): Promise<void> {
    await this.municipioRepository.updateById(id, municipio);
  }

  @put('/municipios/{id}')
  @response(204, {
    description: 'Municipio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() municipio: Municipio,
  ): Promise<void> {
    await this.municipioRepository.replaceById(id, municipio);
  }

  @del('/municipios/{id}')
  @response(204, {
    description: 'Municipio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.municipioRepository.deleteById(id);
  }
}
