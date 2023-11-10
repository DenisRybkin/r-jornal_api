import { Injectable, PipeTransform } from '@nestjs/common'
import { Locale, LocaleType } from '../interfaces/common'

@Injectable()
export class LocalePipe implements PipeTransform<string, LocaleType> {
  transform(value: string): LocaleType {
    switch (value) {
      case 'en':
        return Locale.en
      case 'ru':
        return Locale.ru
    }
    return Locale.en
  }
}
