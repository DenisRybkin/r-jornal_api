import { QueryNamingConventionConstants } from 'src/core/constants/quey-naming-convention.constants'

export type ReadFilter = {
  key: string
  filterType: QueryNamingConventionConstants
  value: number | string | boolean
}
