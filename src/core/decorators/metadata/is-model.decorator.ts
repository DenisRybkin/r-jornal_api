import { SetMetadata } from '@nestjs/common'
import { Model } from 'sequelize-typescript'

export const MODEL_KEY = Symbol('Model')

export const setModel = (model: new () => Model) =>
  SetMetadata(MODEL_KEY, model)
