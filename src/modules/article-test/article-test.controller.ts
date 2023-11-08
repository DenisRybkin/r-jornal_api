import { ApiExtraModels, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import {
  ComplexCreateArticleTestAnswerDto,
  ComplexCreateArticleTestDto,
  ComplexCreateArticleTestQuestionDto,
  ComplexUpdateArticleTestAnswerDto,
  ComplexUpdateArticleTestDto,
  ComplexUpdateArticleTestQuestionDto,
  CreateArticleTestDto,
  ReadArticleTestFilterDto,
  UpdateArticleTestDto,
  UpdatePartiallyArticleTestDto
} from './dto'
import { buildBaseControllerCRUD } from '../../core/bases/controllers'
import { ArticleTest } from '../../database/models/singles/ArticleTest/article-test.model'
import { ArticleTestService } from './article-test.service'
import { CreateEndpoint, UpdateEndpoint } from '../../core/bases/decorators'
import { Roles } from '../../core/interfaces/common'
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe'
import { PipeExceptionFactory } from '../../core/factories/pipe-exception.factory'
import { ConstraintMessagesConstants } from '../../core/constants'
import { AsyncContext } from '../../core/modules/async-context/async-context'
import { ArticleTestUserService } from './article-test-user.service'

const BaseController = buildBaseControllerCRUD<ArticleTest>({
  swagger: { model: ArticleTest, modelName: 'article test' },
  privacySettings: {
    getAllIsPublic: true,
    getByIdIsPublic: true,
    autocompleteIsPublic: true,
    createRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    updateRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher],
    deleteRequireRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  },
  filterDto: ReadArticleTestFilterDto,
  createDto: CreateArticleTestDto,
  updateDto: UpdateArticleTestDto,
  updatePartiallyDto: UpdatePartiallyArticleTestDto
})

@ApiExtraModels(
  ComplexCreateArticleTestDto,
  ComplexCreateArticleTestQuestionDto,
  ComplexCreateArticleTestAnswerDto,
  ComplexUpdateArticleTestDto,
  ComplexUpdateArticleTestQuestionDto,
  ComplexUpdateArticleTestAnswerDto,
  CreateArticleTestDto,
  UpdateArticleTestDto,
  UpdatePartiallyArticleTestDto,
  ReadArticleTestFilterDto
)
@ApiTags('Article Test')
@Controller('article-test')
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class ArticleTestController extends BaseController {
  constructor(
    private readonly articleTestService: ArticleTestService,
    private readonly articleTestUserService: ArticleTestUserService,
    // private readonly userAchievementService: UserAchievementService,
    private readonly asyncContext: AsyncContext<string, any>
  ) {
    super(articleTestService)
  }

  @CreateEndpoint({
    operationName: 'Endpoint for create test with full test dto model',
    modelName: 'article test',
    createDto: ComplexCreateArticleTestDto,
    model: ComplexCreateArticleTestDto,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  })
  @Post('/complex')
  async createComplex(@Body() dto: ComplexCreateArticleTestDto) {
    return await this.articleTestService.createComplex(dto)
  }

  @UpdateEndpoint({
    operationName: 'Endpoint for update test with full test dto model',
    modelName: 'article test',
    updateDto: ComplexUpdateArticleTestDto,
    model: ComplexUpdateArticleTestDto,
    requiredRoles: [Roles.Owner, Roles.Admin, Roles.Publisher]
  })
  @Put('/complex/:id')
  async updateComplex(
    @Param(
      'id',
      new ParseIntPipe({
        exceptionFactory: PipeExceptionFactory('id', [
          ConstraintMessagesConstants.MustBeInteger
        ])
      })
    )
    id: number,
    @Body() dto: ComplexUpdateArticleTestDto
  ) {
    return await this.articleTestService.updateComplex(id, dto)
  }
}
