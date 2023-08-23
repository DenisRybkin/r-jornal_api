import { Includeable, WhereOptions } from 'sequelize'
import { Model, Repository } from 'sequelize-typescript'
import { IAutocomplete, IPaging, IPagingOptions } from '../../common'

export interface IConfigServiceRead<T extends Model<T, any>> {
  modelRepository: Repository<T>
  autocompleteProperty: string
  includes?: Includeable[]
  whereOpts?: WhereOptions<T>
  whereOptsFactory?: () => WhereOptions
}

export abstract class BaseServiceRead<T extends Model<T, any>> {
  constructor(protected readonly config: IConfigServiceRead<T>) {}
  abstract getById(id: number): Promise<T | null>
  abstract getAll(
    pagingOptions: IPagingOptions,
    filterOpts: WhereOptions
  ): Promise<IPaging<T>>
  abstract autocomplete(
    opts: IPagingOptions,
    filterOpts: WhereOptions
  ): Promise<IPaging<IAutocomplete>>
}
