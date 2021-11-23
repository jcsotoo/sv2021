import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cliente, ClienteRelations, Pedido, Municipio} from '../models';
import {PedidoRepository} from './pedido.repository';
import {MunicipioRepository} from './municipio.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.clienteId,
  ClienteRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.clienteId>;

  public readonly municipio: BelongsToAccessor<Municipio, typeof Cliente.prototype.clienteId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>,
  ) {
    super(Cliente, dataSource);
    this.municipio = this.createBelongsToAccessorFor('municipio', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
