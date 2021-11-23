import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Codeudor, CodeudorRelations} from '../models';

export class CodeudorRepository extends DefaultCrudRepository<
  Codeudor,
  typeof Codeudor.prototype.codeudorId,
  CodeudorRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Codeudor, dataSource);
  }
}
