import { Model, Repository, Sequelize } from 'sequelize-typescript';
import { IServiceRead } from '../interfaces/rest/services';
import { IAutocomplete, IPaging, IPagingOptions } from '../interfaces/common';
import { PaginationHelper } from '../helpers';

export class ApiServiceRead<T extends Model<T, any>, TFilter>
  implements IServiceRead<T, TFilter>
{
  protected modelRepository: Repository<T>;
  protected paginationHelper = new PaginationHelper<T>();

  constructor(
    connection: Sequelize,
    entityClass: new () => T,
    private readonly majorProp: string,
  ) {
    this.modelRepository = connection.getRepository<T>(entityClass);
  }

  public async getAll(
    opts: Required<IPagingOptions>,
  ): Promise<IPaging<T> | null> {
    const { count, rows } = await this.modelRepository.findAndCountAll({
      ...this.paginationHelper.genPagingOpts(opts),
      order: [this.majorProp, opts.order.toUpperCase()],
    });
    return this.paginationHelper.mapToIPaging(count, rows, opts);
  }

  public async getById(id: number, opts?: TFilter): Promise<T | null> {
    return await this.modelRepository.findByPk(id);
  }

  public async autocomplete(
    opts: Required<IPagingOptions>,
  ): Promise<IAutocomplete[] | null> {
    const { count, rows } = await this.modelRepository.findAndCountAll({
      ...this.paginationHelper.genPagingOpts(opts),
      attributes: ['id', this.majorProp],
      order: [this.majorProp, opts.order.toUpperCase()],
    });
    return this.paginationHelper.mapToIPaging(
      count,
      rows,
      opts,
    ) as unknown as IAutocomplete[];
  }
}
