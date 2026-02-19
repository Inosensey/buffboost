import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// utils
import { ApiResponse } from 'src/utils/responseShaper';

// Service
import { UserTypeService } from './userType.service';

// Types
import { CreateUserTypeDTO, UpdateUserTypeDto } from './userType.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permission.guard';

@Controller('userTypes')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get()
  async getUserTypes() {
    const users = await this.userTypeService.getUserTypes();
    return ApiResponse.success(users, 'Users Type retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/:id')
  async getUserTypeById(@Param('id') userTypeId: string) {
    const user = await this.userTypeService.getUserTypeById(userTypeId);
    return ApiResponse.success(user, 'User Type retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Post('/create')
  async createUserType(
    @Body()
    user: CreateUserTypeDTO,
  ) {
    const result = await this.userTypeService.createUserType(user);
    return ApiResponse.success(result, 'User Type created successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Put('/update/:id')
  async updateUserType(
    @Param('id') userTypeId: string,
    @Body()
    data: UpdateUserTypeDto,
  ) {
    const result = await this.userTypeService.updateUserType(userTypeId, data);
    return ApiResponse.success(result, 'User Type updated successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Delete('/delete/:id')
  async deleteUserType(@Param('id') userTypeId: string) {
    const result = await this.userTypeService.deleteUserType(userTypeId);
    return ApiResponse.success(result, 'User Type deleted successfully');
  }
}
