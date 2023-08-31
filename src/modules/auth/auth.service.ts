import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { RoleService } from '../role/role.service'
import { JwtService } from '@nestjs/jwt'
import { ApiConfigService } from '../../core/modules/shared/services/api-config.service'
import { LoginDto } from './dtos/login.dto'
import { UnauthorizedException } from '../../core/exceptions/build-in'
import {
  ErrorMessagesConstants,
  InternalConfigurationConstants
} from '../../core/constants'
import bcrypt from 'bcryptjs'
import { TokenPayload } from './types'
import { User } from '../../database/models/singles/User/user.model'
import { CreateUserDto } from '../user/dtos'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService
  ) {}

  public async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    return this.generateTokens(await this.createTokenPayload(user))
  }

  async registration(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      InternalConfigurationConstants.BcryptSalt
    )

    const user = await this.userService.create({
      ...dto,
      password: hashedPassword
    })

    return this.generateTokens(await this.createTokenPayload(user))
  }

  async refresh(refresh: string) {
    const token = await this.jwtService.verifyAsync(
      refresh || '',
      this.configService.jwtRefreshConfig
    )

    const user = await this.userService.getById(
      token.id,
      new UnauthorizedException(
        ErrorMessagesConstants.Unauthorized,
        'Refreshing by token data failed'
      )
    )

    return this.generateTokens(await this.createTokenPayload(user))
  }

  private async createTokenPayload({
    id,
    email,
    roleId
  }: User): Promise<TokenPayload> {
    const role = await this.roleService.getById(roleId)
    return { id, email, roleId, roleName: role.name }
  }

  private generateTokens(payload: TokenPayload) {
    return {
      access: this.jwtService.sign(payload, this.configService.jwtAccessConfig),
      refresh: this.jwtService.sign(
        payload,
        this.configService.jwtRefreshConfig
      )
    }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(
      dto.email,
      new UnauthorizedException(
        ErrorMessagesConstants.Unauthorized,
        'User with this email does not exist'
      )
    )
    const passwordsEquals = await bcrypt.compare(dto.password, user.password)

    if (!passwordsEquals)
      throw new UnauthorizedException(
        ErrorMessagesConstants.Unauthorized,
        'Invalid token'
      )

    return user
  }
}
