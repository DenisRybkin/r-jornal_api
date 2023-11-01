import { IModelInfo, ModelInfo } from './metadata/model-info.decorator'
import { applyDecorators, UseGuards } from '@nestjs/common'
import { CheckModifyPermissionGuard } from '../guards'

export const CheckPermissionModify = (modelInfo?: IModelInfo) =>
  applyDecorators(ModelInfo(modelInfo), UseGuards(CheckModifyPermissionGuard))
