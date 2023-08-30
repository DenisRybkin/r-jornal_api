import { SetMetadata } from '@nestjs/common'
import { Model } from 'sequelize-typescript'

export const MODEL_INFO_KEY = Symbol('Model')

export interface IModelInfo {
  EntityClass: new () => Model
  creatorIdField: string
}

export const ModelInfo = (info?: IModelInfo) =>
  SetMetadata(MODEL_INFO_KEY, info)
