import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Asesor, Pedido, Oficina} from '../models';
import {AsesorRepository} from './asesor.repository';
import {PedidoRepository} from './pedido.repository';
import {OficinaRepository} from './oficina.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.vehiculoId,
  VehiculoRelations
> {

  public readonly asesor: BelongsToAccessor<Asesor, typeof Vehiculo.prototype.vehiculoId>;

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Vehiculo.prototype.vehiculoId>;

  public readonly oficina: BelongsToAccessor<Oficina, typeof Vehiculo.prototype.vehiculoId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('OficinaRepository') protected oficinaRepositoryGetter: Getter<OficinaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.oficina = this.createBelongsToAccessorFor('oficina', oficinaRepositoryGetter,);
    this.registerInclusionResolver('oficina', this.oficina.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
  }
}
