import { Injectable } from '@nestjs/common'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { catchError, firstValueFrom } from 'rxjs'
import {
  defaultGPTOptions,
  genTemplatesForQuestions,
  jsonSeparator
} from './utils/query.templates'
import { LocaleType } from '../../core/interfaces/common'
import { HttpService } from '@nestjs/axios'
import { Readable } from 'stream'
import { InternalServerErrorException } from '../../core/exceptions/build-in'
import { ErrorMessagesConstants } from '../../core/constants'
import { queryGetter } from './utils/query-getter.util'

@Injectable()
export class OpenAiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ApiConfigService
  ) {}

  public async promptGenerateQuestions(
    topic: string,
    locale: LocaleType,
    count = 3
  ): Promise<string> {
    const data = {
      ...defaultGPTOptions(this.configService.alisaGPTConfig.idKey),
      messages: genTemplatesForQuestions(topic, locale, count)
    }

    const res = await firstValueFrom(
      this.httpService.post<Readable>('', data).pipe(
        catchError((error: Error) => {
          throw new InternalServerErrorException(
            ErrorMessagesConstants.InternalError,
            'Something went wrong'
          )
        })
      )
    )
    const awaited = await res
    const target = queryGetter(awaited)
    return target.slice(
      target.indexOf(jsonSeparator) + jsonSeparator.length,
      target.lastIndexOf(jsonSeparator)
    )
  }
}
