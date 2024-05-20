import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { QueryFailedErrorDto } from '@/filters/dto/query-fail.dto';
import { UserOut } from '@/user/dto/user.dto';
import { Public } from '@/utils/constants';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get()
  @ApiOperation({ description: 'Get users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Got users',
    type: UserOut,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  async getUsers() {
    return this.userService.findOne('123');
  }

  @Public()
  @Post()
  @ApiOperation({ description: 'Create user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Created user',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: QueryFailedErrorDto,
  })
  async createUser() {
    return [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
    ];
  }

  // @Post()
  // @ApiOperation({ description: 'Create user' })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Created user',
  // })
  // @ApiResponse({
  //   status: HttpStatus.BAD_REQUEST,
  //   description: 'Bad request',
  //   type: QueryFailedErrorDto,
  // })
  // async createUser(@Body() loginDTO: LoginDto) {
  //   const { login, password } = loginDTO;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const createdUser = await this.userService.create({
  //     login,
  //     password: hashedPassword,
  //   });
  //
  //   return createdUser;
  // }
}
