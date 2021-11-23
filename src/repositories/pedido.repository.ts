import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Asesor, Codeudor, Vehiculo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {AsesorRepository} from './asesor.repository';
import {CodeudorRepository} from './codeudor.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.pedidoId,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.pedidoId>;

  public readonly asesor: BelongsToAccessor<Asesor, typeof Pedido.prototype.pedidoId>;

  public readonly codeudor: BelongsToAccessor<Codeudor, typeof Pedido.prototype.pedidoId>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Pedido.prototype.pedidoId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('CodeudorRepository') protected codeudorRepositoryGetter: Getter<CodeudorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Pedido, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.codeudor = this.createBelongsToAccessorFor('codeudor', codeudorRepositoryGetter,);
    this.registerInclusionResolver('codeudor', this.codeudor.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
