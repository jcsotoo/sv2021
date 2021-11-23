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
  Cliente,
} from '../models';
import {MunicipioRepository} from '../repositories';

export class MunicipioClienteController {
  constructor(
    @repository(MunicipioRepository) protected municipioRepository: MunicipioRepository,
  ) { }

  @get('/municipios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Municipio has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.municipioRepository.clientes(id).find(filter);
  }

  @post('/municipios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Municipio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Municipio.prototype.municipioId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInMunicipio',
            exclude: ['clienteId'],
            optional: ['municipioId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'clienteId'>,
  ): Promise<Cliente> {
    return this.municipioRepository.clientes(id).create(cliente);
  }

  @patch('/municipios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Municipio.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.municipioRepository.clientes(id).patch(cliente, where);
  }

  @del('/municipios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Municipio.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.municipioRepository.clientes(id).delete(where);
  }
}
