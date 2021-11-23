import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Municipio, MunicipioRelations, Cliente, Usuario, Oficina, Departamento} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioRepository} from './usuario.repository';
import {OficinaRepository} from './oficina.repository';
import {DepartamentoRepository} from './departamento.repository';

export class MunicipioRepository extends DefaultCrudRepository<
  Municipio,
  typeof Municipio.prototype.municipioId,
  MunicipioRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Municipio.prototype.municipioId>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Municipio.prototype.municipioId>;

  public readonly oficinas: HasManyRepositoryFactory<Oficina, typeof Municipio.prototype.municipioId>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Municipio.prototype.municipioId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('OficinaRepository') protected oficinaRepositoryGetter: Getter<OficinaRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Municipio, dataSource);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.oficinas = this.createHasManyRepositoryFactoryFor('oficinas', oficinaRepositoryGetter,);
    this.registerInclusionResolver('oficinas', this.oficinas.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
