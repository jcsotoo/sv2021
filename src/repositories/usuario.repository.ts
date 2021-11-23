import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Municipio} from '../models';
import {MunicipioRepository} from './municipio.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.usuarioId,
  UsuarioRelations
> {

  public readonly municipio: BelongsToAccessor<Municipio, typeof Usuario.prototype.usuarioId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MunicipioRepository') protected municipioRepositoryGetter: Getter<MunicipioRepository>,
  ) {
    super(Usuario, dataSource);
    this.municipio = this.createBelongsToAccessorFor('municipio', municipioRepositoryGetter,);
    this.registerInclusionResolver('municipio', this.municipio.inclusionResolver);
  }
}
