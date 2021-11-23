import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Asesor, AsesorRelations, Pedido, Vehiculo} from '../models';
import {PedidoRepository} from './pedido.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.asesorId,
  AsesorRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Asesor.prototype.asesorId>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Asesor.prototype.asesorId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Asesor, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
