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
import { BuffService } from './buff.service';
import { ApiResponse } from 'src/utils/responseShaper';
import { MutateBuffDto } from './buff.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PermissionsGuard } from 'src/guards/permission.guard';

@Controller('buffs')
export class BuffController {
  constructor(private readonly buffService: BuffService) {}

  // @UseGuards(AuthGuard, PermissionsGuard)
  @Get()
  async getBUffs() {
    const buffs = await this.buffService.getBuffs();
    return ApiResponse.success(buffs, 'Buffs retrieved successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Get('/id')
  async getBuff(@Param() id: string) {
    const buff = await this.buffService.getBuff(id);
    return ApiResponse.success(buff, 'Buff retrieved successfully');
  }

  // @UseGuards(AuthGuard, PermissionsGuard)
  @Post('/create')
  async createBuff(@Body() data: MutateBuffDto) {
    const buff = await this.buffService.createBuff(data);
    return ApiResponse.success(buff, 'Buff Created SUccessfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Put('/update/:id')
  async updateBUff(@Param() id: string, @Body() data: MutateBuffDto) {
    const buff = await this.buffService.updateBuff(id, data);
    return ApiResponse.success(buff, 'Buff Updated Successfully');
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @Delete('/delete/:id')
  async deleteBUff(@Param() id: string) {
    await this.buffService.deleteBuff(id);
    return ApiResponse.success(null, 'Buff Deleted Successfully');
  }
}
