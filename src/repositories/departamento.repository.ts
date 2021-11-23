import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Municipio} from '../models';
import {MunicipioRepository} from './municipio.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.deptoId,
  DepartamentoRelations
> {

  public readonly municipios: HasManyRepositoryFactory<Municipio, typeof Departamento.prototype.deptoId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>,
  ) {
    super(Departamento, dataSource);
    this.municipios = this.createHasManyRepositoryFactoryFor('municipios', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipios', this.municipios.inclusionResolver);
  }
}
