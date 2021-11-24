import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Municipio, MunicipioRelations, Departamento, Usuario, Oficina} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {UsuarioRepository} from './usuario.repository';
import {OficinaRepository} from './oficina.repository';

export class MunicipioRepository extends DefaultCrudRepository<
  Municipio,
  typeof Municipio.prototype.municipioId,
  MunicipioRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Municipio.prototype.municipioId>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Municipio.prototype.municipioId>;

  public readonly oficinas: HasManyRepositoryFactory<Oficina, typeof Municipio.prototype.municipioId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('OficinaRepository') protected oficinaRepositoryGetter: Getter<OficinaRepository>,
  ) {
    super(Municipio, dataSource);
    this.oficinas = this.createHasManyRepositoryFactoryFor('oficinas', oficinaRepositoryGetter,);
    this.registerInclusionResolver('oficinas', this.oficinas.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
