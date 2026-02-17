import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// utils
import { ApiResponse } from 'src/utils/responseShaper';

// Service
import { UserTypeService } from './userType.service';

// Types
import { CreateUserTypeDTO, UpdateUserTypeDto } from './userType.dto';

@Controller('userTypes')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  async getUserTypes() {
    const users = await this.userTypeService.getUserTypes();
    return ApiResponse.success(users, 'Users Type retrieved successfully');
  }

  @Get('/:id')
  async getUserTypeById(@Param('id') userTypeId: string) {
    const user = await this.userTypeService.getUserTypeById(userTypeId);
    return ApiResponse.success(user, 'User Type retrieved successfully');
  }

  @Post('/create')
  async createUser(
    @Body()
    user: CreateUserTypeDTO,
  ) {
    const result = await this.userTypeService.createUserType(user);
    return ApiResponse.success(result, 'User Type created successfully');
  }

  @Put('/update/:id')
  async updateUser(
    @Param('id') userTypeId: string,
    @Body()
    data: UpdateUserTypeDto,
  ) {
    const result = await this.userTypeService.updateUserType(userTypeId, data);
    return ApiResponse.success(result, 'User Type updated successfully');
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') userTypeId: string) {
    const result = await this.userTypeService.deleteUserType(userTypeId);
    return ApiResponse.success(result, 'User Type deleted successfully');
  }
}
