import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Oficina, OficinaRelations} from '../models';

export class OficinaRepository extends DefaultCrudRepository<
  Oficina,
  typeof Oficina.prototype.oficinaId,
  OficinaRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Oficina, dataSource);
  }
}
