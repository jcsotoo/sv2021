import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Oficina, OficinaRelations, Municipio, Codeudor, Vehiculo} from '../models';
import {MunicipioRepository} from './municipio.repository';
import {CodeudorRepository} from './codeudor.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class OficinaRepository extends DefaultCrudRepository<
  Oficina,
  typeof Oficina.prototype.oficinaId,
  OficinaRelations
> {

  public readonly municipio: BelongsToAccessor<Municipio, typeof Oficina.prototype.oficinaId>;

  public readonly codeudor: BelongsToAccessor<Codeudor, typeof Oficina.prototype.oficinaId>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Oficina.prototype.oficinaId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>, @repository.getter('CodeudorRepository') protected codeudorRepositoryGetter: Getter<CodeudorRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Oficina, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.codeudor = this.createBelongsToAccessorFor('codeudor', codeudorRepositoryGetter,);
    this.registerInclusionResolver('codeudor', this.codeudor.inclusionResolver);
    this.municipio = this.createBelongsToAccessorFor('municipio', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
  }
}
