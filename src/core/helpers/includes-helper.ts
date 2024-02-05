import { ReadAssociatedFilter } from '../interfaces/common'
import { IncludeOptions } from 'sequelize/types/model'
import { Model } from 'sequelize-typescript'
import { getOperationByConventionConstant } from '../bases/utils/transform-read-filter.util'

export class IncludesHelper {
  public static transformWithFilters<T extends Model<T, any>>(
    includes: IncludeOptions[],
    readFilters: ReadAssociatedFilter[]
  ) {
    return includes?.map(include => {
      const whereOption = readFilters?.find(
        filter => filter.associatedModel == include.as
      )
      if (!whereOption) return include
      return {
        ...include,
        where: {
          [whereOption.key]: {
            [getOperationByConventionConstant(whereOption.filterType)]:
              whereOption.value
          }
        }
      }
    })
  }
}
