import { ReadFilter } from './read-filter.type'

export type ReadAssociatedFilter = ReadFilter & {
  associatedModel: string
}
