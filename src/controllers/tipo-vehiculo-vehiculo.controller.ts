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
  TipoVehiculo,
  Vehiculo,
} from '../models';
import {TipoVehiculoRepository} from '../repositories';

export class TipoVehiculoVehiculoController {
  constructor(
    @repository(TipoVehiculoRepository) protected tipoVehiculoRepository: TipoVehiculoRepository,
  ) { }

  @get('/tipo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of TipoVehiculo has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.tipoVehiculoRepository.vehiculos(id).find(filter);
  }

  @post('/tipo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoVehiculo.prototype.tipoVehiculo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInTipoVehiculo',
            exclude: ['vehiculoId'],
            optional: ['tipoVehiculoId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'vehiculoId'>,
  ): Promise<Vehiculo> {
    return this.tipoVehiculoRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/tipo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.tipoVehiculoRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/tipo-vehiculos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'TipoVehiculo.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.tipoVehiculoRepository.vehiculos(id).delete(where);
  }
}
