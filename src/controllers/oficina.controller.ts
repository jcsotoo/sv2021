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
import {Oficina} from '../models';
import {OficinaRepository} from '../repositories';

export class OficinaController {
  constructor(
    @repository(OficinaRepository)
    public oficinaRepository : OficinaRepository,
  ) {}

  @post('/oficinas')
  @response(200, {
    description: 'Oficina model instance',
    content: {'application/json': {schema: getModelSchemaRef(Oficina)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficina, {
            title: 'NewOficina',
            
          }),
        },
      },
    })
    oficina: Oficina,
  ): Promise<Oficina> {
    return this.oficinaRepository.create(oficina);
  }

  @get('/oficinas/count')
  @response(200, {
    description: 'Oficina model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Oficina) where?: Where<Oficina>,
  ): Promise<Count> {
    return this.oficinaRepository.count(where);
  }

  @get('/oficinas')
  @response(200, {
    description: 'Array of Oficina model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Oficina, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Oficina) filter?: Filter<Oficina>,
  ): Promise<Oficina[]> {
    return this.oficinaRepository.find(filter);
  }

  @patch('/oficinas')
  @response(200, {
    description: 'Oficina PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficina, {partial: true}),
        },
      },
    })
    oficina: Oficina,
    @param.where(Oficina) where?: Where<Oficina>,
  ): Promise<Count> {
    return this.oficinaRepository.updateAll(oficina, where);
  }

  @get('/oficinas/{id}')
  @response(200, {
    description: 'Oficina model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Oficina, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Oficina, {exclude: 'where'}) filter?: FilterExcludingWhere<Oficina>
  ): Promise<Oficina> {
    return this.oficinaRepository.findById(id, filter);
  }

  @patch('/oficinas/{id}')
  @response(204, {
    description: 'Oficina PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oficina, {partial: true}),
        },
      },
    })
    oficina: Oficina,
  ): Promise<void> {
    await this.oficinaRepository.updateById(id, oficina);
  }

  @put('/oficinas/{id}')
  @response(204, {
    description: 'Oficina PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oficina: Oficina,
  ): Promise<void> {
    await this.oficinaRepository.replaceById(id, oficina);
  }

  @del('/oficinas/{id}')
  @response(204, {
    description: 'Oficina DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oficinaRepository.deleteById(id);
  }
}
